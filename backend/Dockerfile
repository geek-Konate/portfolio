FROM python:3.13-slim AS builder
# Empêche Python d'écrire des fichiers .pyc sur le disque
ENV PYTHONDONTWRITEBYTECODE=1

# Force l'affichage immédiat des logs dans la console sans mise en tampon (buffering)
ENV PYTHONUNBUFFERED=

# Définit le dossier de travail pour l'étape de construction
WORKDIR /app

# Installation des dépendances système de base nécessaires au build (ex: compilateurs si besoin)

RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	curl \
	libpq-dev \
	&& rm-rf /var/lib/apt/lists/*
	
	
# Installation de Poetry
RUN curl -sSl https://install.python-poetry.org | python3 -

# Ajout de Poetry au PATH système pour pouvoir utiliser la commande 'poetry'
ENV PATH="/root/.local/bin:$PATH"

# Configuration de Poetry pour ne pas créer d'environnement virtuel séparé dans le container
RUN poetry config virtualenvs.create false

# Installation des dépendances de production uniquement (sans les outils de dev)
RUN poetry install --no-interaction --no-ansi --no-root --only main

# ==========================================
# ÉTAPE 2 : RUNTIME (Image finale d'exécution)
# ==========================================
# On repart d'une image propre et vierge
FROM python:13.3-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installation de la bibliothèque runtime pour PostgreSQL (libpq5 est requis pour psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
	libpq5 \
	&& rm -rf /var/lib/apt/lists/*
	

# Création d'un groupe et d'un utilisateur non-root pour des raisons de sécurité
RUN groupadd -r appgroup && useradd -r -g appgroup -u 1001 appuser

# Définition du répertoire de travail
WORKDIR /app

# Copie des packages Python installés depuis la phase 'builder' vers l'image finale
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copie de l'intégralité du code de l'application dans le conteneur
COPY . /app/

# Rendre le script entrypoint exécutable
RUN chown -R appuser:appgroup /app

# Basculement vers l'utilisateur sécurisé (non-root)
USER appuser

# Exposition du port sur lequel FastAPI va écouter
EXPOSE 8000

# Spécification de l'entrypoint pour gérer le démarrage de l'application
ENTRYPOINT ["/app/entrypoint.sh"]



