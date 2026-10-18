# app/main.py
import os
import sys
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

# Permet les imports relatifs
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 🔥 On importe la base et l'engine depuis database.py
from app.database import engine, Base, SessionLocal

# ────────────────────────────────────────────────
# FastAPI
# ────────────────────────────────────────────────

app = FastAPI()

# ────────────────────────────────────────────────
# CORS
# ────────────────────────────────────────────────

origins = [
    "https://portfolio-mamadou-konate.vercel.app",

    # local dev
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ────────────────────────────────────────────────
# 📁 Stockage local des fichiers (images/screenshots)
# ────────────────────────────────────────────────
# Le dossier "uploads" est à la racine du backend
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
(UPLOAD_DIR / "screenshots").mkdir(exist_ok=True)

# Servir les fichiers : /uploads/screenshots/xxx.png
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
print(f"✅ Dossier uploads servi sur /uploads -> {UPLOAD_DIR.resolve()}")

# ────────────────────────────────────────────────
# Routes API
# ────────────────────────────────────────────────

try:
    from app.api.endpoints import router as api_router
    app.include_router(api_router, prefix="/api")
    print("✅ Router API chargé")
except Exception as e:
    print(f"❌ Erreur chargement router: {e}")

# ────────────────────────────────────────────────
# Health & root
# ────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "message": "🚀 Portfolio Backend API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/api/health")
def health():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        # Si la connexion échoue (base endormie ou autre problème)
        return {"status": "unhealthy", "database": "connection_failed", "error": str(e)}, 503

@app.get("/api/ping")
def ping():
    return {"status": "alive", "time": datetime.utcnow().isoformat()}

# ────────────────────────────────────────────────
# Création des tables
# ────────────────────────────────────────────────

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Tables synchronisées avec la base")
except Exception as e:
    print(f"❌ Erreur création tables: {e}")

# ────────────────────────────────────────────────
# Seed skills
# ────────────────────────────────────────────────

try:
    from sqlalchemy.orm import Session
    from app.models import Skill, Project

    db = SessionLocal()

    # Liste des compétences que vous voulez AVOIR
    desired_skills = [
        {
            "name": "React.js",
            "category": "frontend",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "description": "Une bibliothèque JavaScript pour construire des interfaces utilisateur",
            "display_order": 1
        },
        {
            "name": "Python",
            "category": "backend",
            "level": 5,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "description": "Langage de programmation polyvalent pour le développement web",
            "display_order": 2
        },
        {
            "name": "FastAPI",
            "category": "backend",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
            "description": "Framework web moderne pour construire des APIs avec Python",
            "display_order": 3
        },
        {
            "name": "PostgreSQL",
            "category": "database",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            "description": "Système de gestion de base de données relationnelle",
            "display_order": 4
        },
        {
            "name": "JavaScript",
            "category": "frontend",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "description": "Langage de programmation pour créer des pages web interactives",
            "display_order": 5
        },
        {
            "name": "HTML5",
            "category": "frontend",
            "level": 5,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "description": "Langage de balisage pour structurer le contenu web",
            "display_order": 6
        },
        {
            "name": "CSS3",
            "category": "frontend",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "description": "Langage de style pour mettre en forme les pages web",
            "display_order": 7
        },
        {
            "name": "Git",
            "category": "tools",
            "level": 4,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            "description": "Système de contrôle de version distribué",
            "display_order": 8
        },
        {
            "name": "Tkinter",
            "category": "frontend",
            "level": 5,
            "icon_url": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
            "description": "Bibliothèque Python pour interfaces graphiques",
            "display_order": 9
        },
        {
            "name": "SQLite",
            "category": "database",
            "level": 5,
            "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
            "description": "Base de données légère embarquée",
            "display_order": 10
        }
    ]

    # Récupérer les compétences existantes
    existing_skills = db.query(Skill).all()
    existing_names = {skill.name for skill in existing_skills}

    print(f"📊 Compétences existantes: {len(existing_skills)}")
    print(f"📋 Noms existants: {sorted(existing_names)}")

    # Trouver les compétences manquantes
    missing_skills_data = []
    for skill_data in desired_skills:
        if skill_data["name"] not in existing_names:
            missing_skills_data.append(skill_data)

    if missing_skills_data:
        print(f"\n🔍 {len(missing_skills_data)} compétences manquantes trouvées:")

        skills_to_add = []

        for data in missing_skills_data:
            skill = Skill(
                name=data["name"],
                category=data["category"],
                level=data["level"],
                icon_url=data["icon_url"],
                description=data["description"],
                display_order=data["display_order"]
            )
            skills_to_add.append(skill)
            print(f"   ➕ {data['name']} (ordre: {data['display_order']})")

        db.add_all(skills_to_add)
        db.commit()
        print(f"\n✅ {len(skills_to_add)} nouvelles compétences ajoutées")
    else:
        print("\n✅ Toutes les compétences sont déjà présentes")

    total_skills = db.query(Skill).count()
    print(f"\n🎯 Total compétences en base: {total_skills}")

except Exception as e:
    print(f"\n❌ ERREUR: {e}")
    import traceback
    traceback.print_exc()
    if 'db' in locals():
        db.rollback()
finally:
    if 'db' in locals():
        db.close()

# ────────────────────────────────────────────────
# Uvicorn
# ────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)