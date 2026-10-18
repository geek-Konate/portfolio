#!/bin/sh

# Stoppe le script immédiatement si une commande renvoie une erreur
set -e

echo "🔄 Lancement des migrations de la base de données avec Alembic..."
alembic upgrade head

echo "🚀 Démarrage de l'application FastAPI..."
# exec permet au processus uvicorn de remplacer le shell pour bien intercepter les signaux (SIGTERM, etc.)
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
