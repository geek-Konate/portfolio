from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import asyncio
import os
import traceback

import resend
from dotenv import load_dotenv

from .. import crud, schemas
from ..database import get_db
from ..models import Skill
from app.storage import (
    upload_screenshot,
    upload_files_to_local,
    delete_file_by_url,
    delete_files_by_urls,
)

load_dotenv()
router = APIRouter()


# ============================================================
# PROJECTS
# ============================================================

@router.get("/projects", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects


@router.post("/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_project(db=db, project=project)
    except Exception as e:
        print("❌ Erreur création projet:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(
    project_id: int,
    project: schemas.ProjectUpdate,
    db: Session = Depends(get_db),
):
    db_project = crud.get_project(db, project_id=project_id)
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    project_update = crud.update_project(
        db=db,
        project_id=project_id,
        project_update=project,
    )
    return project_update


@router.patch("/projects/{project_id}/screenshots")
async def update_project_screenshots(
    project_id: int,
    new_files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    db_project = crud.get_project(db, project_id)
    if not db_project:
        raise HTTPException(404, "Project not found")

    # ✅ Stockage local au lieu de Supabase
    new_urls = await upload_files_to_local(new_files)

    current = db_project.screenshots or []
    db_project.screenshots = current + new_urls

    db.commit()
    db.refresh(db_project)

    return {
        "message": "Screenshots added successfully",
        "new_urls": new_urls,
        "total_screenshots": len(db_project.screenshots),
    }


@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # ✅ Suppression des fichiers en local
    if db_project.screenshots:
        deleted_count = delete_files_by_urls(db_project.screenshots)
        print(f"🗑️ {deleted_count}/{len(db_project.screenshots)} fichiers supprimés")

    crud.delete_project(db, project_id=project_id)
    return {
        "message": "Project deleted successfully",
        "deleted_id": project_id,
    }


# ============================================================
# UPLOAD SCREENSHOTS
# ============================================================

@router.post("/upload/screenshots")
async def upload_screenshots(files: List[UploadFile] = File(...)):
    """
    Upload un ou plusieurs screenshots.
    Retourne la liste des URLs relatives.
    """
    try:
        urls = await upload_files_to_local(files)
        return {"urls": urls}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de l'upload : {str(e)}",
        )


# ============================================================
# SKILLS
# ============================================================

@router.get("/skills")
def get_skills(db: Session = Depends(get_db)):
    try:
        skills = db.query(Skill).order_by(Skill.display_order).all()
        return skills
    except ImportError:
        return [
            {"id": 1, "name": "React", "category": "frontend", "level": 4},
            {"id": 2, "name": "Python", "category": "backend", "level": 5},
            {"id": 3, "name": "FastAPI", "category": "backend", "level": 4},
            {"id": 4, "name": "PostgreSQL", "category": "database", "level": 4},
            {"id": 5, "name": "Git", "category": "tools", "level": 4},
        ]


# ============================================================
# CONTACT (inchangé)
# ============================================================

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Portfolio <onboarding@resend.dev>")
EMAIL_TO = os.getenv("EMAIL_TO")


@router.post("/contact")
async def submit_contact_form(contact: schemas.ContactForm):
    try:
        print(f"📨 Nouveau contact: {contact.first_name} {contact.last_name} ({contact.email})")
        print(f"📱 Téléphone: {contact.phone}")
        print(f"🏷️ Sujet: {contact.topic}")
        print(f"📝 Message: {contact.message[:100]}...")

        if not RESEND_API_KEY:
            error_msg = "RESEND_API_KEY non configurée"
            print(f"❌ {error_msg}")
            return {
                "success": False,
                "error": error_msg,
                "details": "Vérifiez les variables d'environnement",
            }

        resend.api_key = RESEND_API_KEY

        if not RESEND_FROM_EMAIL:
            error_msg = "RESEND_FROM_EMAIL non configurée"
            print(f"❌ {error_msg}")
            return {
                "success": False,
                "error": error_msg,
                "details": "L'adresse d'expédition n'est pas configurée",
            }

        if not EMAIL_TO:
            error_msg = "EMAIL_TO non configurée"
            print(f"❌ {error_msg}")
            return {
                "success": False,
                "error": error_msg,
                "details": "L'adresse de destination n'est pas configurée",
            }

        print(f"📧 Configuration Resend OK")
        print(f"  From: {RESEND_FROM_EMAIL}")
        print(f"  To: {EMAIL_TO}")

        email_content = {
            "from": RESEND_FROM_EMAIL,
            "to": [EMAIL_TO],
            "reply_to": f"{contact.first_name} {contact.last_name} <{contact.email}>",
            "subject": f"📩 Portfolio: {contact.topic}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #2563eb;">Nouveau message portfolio</h2>
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
                    <p><strong>👤 Visiteur:</strong> {contact.first_name} {contact.last_name}</p>
                    <p><strong>📧 Email:</strong> {contact.email}</p>
                    <p><strong>📱 Téléphone:</strong> {contact.phone or 'Non fourni'}</p>
                    <p><strong>🏷️ Sujet:</strong> {contact.topic}</p>
                </div>
                <div style="margin-top: 20px; padding: 20px; background: #f8fafc; border-left: 4px solid #2563eb;">
                    <h4>💬 Message:</h4>
                    <p style="white-space: pre-line;">{contact.message}</p>
                </div>
                <hr style="margin: 30px 0;">
                <div style="font-size: 12px; color: #6b7280;">
                    <p>📅 Reçu le {datetime.now().strftime('%d/%m/%Y à %H:%M')}</p>
                </div>
            </div>
            """,
            "text": f"""Nouveau message portfolio:

Nom: {contact.first_name} {contact.last_name}
Email: {contact.email}
Téléphone: {contact.phone or 'Non fourni'}
Sujet: {contact.topic}

Message:
{contact.message}

---
Reçu le {datetime.now().strftime('%d/%m/%Y à %H:%M')}""",
        }

        try:
            response = await asyncio.wait_for(
                asyncio.get_event_loop().run_in_executor(
                    None,
                    lambda: resend.Emails.send(email_content),
                ),
                timeout=10.0,
            )

            print(f"✅ Email envoyé via Resend")
            print(f"📨 ID: {response.get('id', 'N/A')}")

            return {
                "success": True,
                "message": "Votre message a été envoyé avec succès !",
                "email_id": response.get("id"),
            }

        except asyncio.TimeoutError:
            print(f"⏰ Timeout lors de l'envoi")
            return {
                "success": False,
                "error": "Le serveur met trop de temps à répondre",
                "details": "Timeout",
            }

    except Exception as e:
        error_msg = str(e)
        print(f"❌ Erreur détaillée: {error_msg}")
        traceback.print_exc()

        if "unauthorized" in error_msg.lower():
            details = "Clé API Resend invalide"
        elif "domain" in error_msg.lower() or "from" in error_msg.lower():
            details = "L'adresse email d'expédition n'est pas vérifiée dans Resend"
        elif "validation" in error_msg.lower():
            details = "Format d'email invalide"
        else:
            details = "Erreur lors de l'envoi de l'email"

        return {
            "success": False,
            "error": "Erreur lors de l'envoi du message",
            "details": details,
            "debug": error_msg,
        }


@router.get("/mobile-test")
async def mobile_test():
    return {
        "mobile": True,
        "message": "✅ Backend accessible depuis mobile",
        "timestamp": datetime.now().isoformat(),
        "api_version": "1.0",
        "endpoints": {
            "projects": "/api/projects",
            "contact": "/api/contact",
            "skills": "/api/skills",
        },
    }


@router.get("/test-email")
async def test_email():
    try:
        import resend

        if not RESEND_API_KEY:
            return {"status": "error", "message": "RESEND_API_KEY non configurée"}

        resend.api_key = RESEND_API_KEY

        test_response = resend.Emails.send({
            "from": RESEND_FROM_EMAIL,
            "to": [EMAIL_TO],
            "subject": "Test Resend - Portfolio",
            "html": "<p>Ceci est un test</p>",
            "text": "Ceci est un test",
        })

        return {
            "status": "success",
            "message": "Test d'email envoyé",
            "response": test_response,
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "config": {
                "has_api_key": bool(RESEND_API_KEY),
                "from_email": RESEND_FROM_EMAIL,
                "to_email": EMAIL_TO,
            },
        }