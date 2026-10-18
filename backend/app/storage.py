# app/storage.py
import os
import uuid
from pathlib import Path
from typing import List, Optional
from fastapi import UploadFile, HTTPException, status

# ============================================================
# CONFIGURATION
# ============================================================

# Dossier racine des uploads (à la racine du backend)
UPLOAD_ROOT = Path("uploads")
SCREENSHOTS_DIR = UPLOAD_ROOT / "screenshots"

# Créer les dossiers au démarrage
SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

# Types MIME autorisés
ALLOWED_MIME_TYPES = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}

# Taille max : 5 Mo
MAX_FILE_SIZE = 5 * 1024 * 1024


# ============================================================
# UPLOAD
# ============================================================

async def upload_screenshot(file: UploadFile) -> str:
    """
    Sauvegarde un screenshot et retourne son URL relative.
    Exemple : "/uploads/screenshots/abc123.png"
    """
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Aucun fichier fourni.",
        )

    # Vérifier le type MIME
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Format non supporté : {file.content_type}. Utilisez JPG, PNG, WEBP ou GIF.",
        )

    # Lire et vérifier la taille
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le fichier ne doit pas dépasser 5 Mo.",
        )

    # Générer un nom unique
    ext = ALLOWED_MIME_TYPES[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = SCREENSHOTS_DIR / filename

    # Écrire sur disque
    try:
        with open(filepath, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la sauvegarde : {str(e)}",
        )

    # Retourner l'URL relative
    return f"/uploads/screenshots/{filename}"


async def upload_files_to_local(files: List[UploadFile]) -> List[str]:
    """Upload plusieurs fichiers et retourne la liste des URLs."""
    urls = []
    for file in files:
        url = await upload_screenshot(file)
        urls.append(url)
    return urls


# ============================================================
# SUPPRESSION
# ============================================================

def delete_file_by_url(url: str) -> bool:
    """
    Supprime un fichier à partir de son URL relative.
    Exemple : delete_file_by_url("/uploads/screenshots/abc123.png")
    """
    if not url or not isinstance(url, str):
        return False

    # Vérifier que l'URL pointe bien vers nos uploads
    if not url.startswith("/uploads/"):
        return False

    # Convertir l'URL en chemin disque
    relative = url.lstrip("/")  # "uploads/screenshots/abc123.png"
    filepath = Path(relative).resolve()

    # Sécurité : vérifier que le fichier est bien dans UPLOAD_ROOT
    try:
        filepath.relative_to(UPLOAD_ROOT.resolve())
    except ValueError:
        # Tentative de path traversal
        print(f"⚠️ Chemin non autorisé : {url}")
        return False

    # Supprimer
    if filepath.exists() and filepath.is_file():
        try:
            filepath.unlink()
            print(f"🗑️ Fichier supprimé : {filepath}")
            return True
        except Exception as e:
            print(f"❌ Erreur suppression {filepath} : {e}")
            return False

    return False


def delete_files_by_urls(urls: List[str]) -> int:
    """Supprime plusieurs fichiers. Retourne le nombre de suppressions réussies."""
    count = 0
    for url in urls or []:
        if delete_file_by_url(url):
            count += 1
    return count