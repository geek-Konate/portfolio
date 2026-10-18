# ==========================================
# ÉTAPE 1 : BUILD (Compilation de l'app React)
# ==========================================

FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances pour profiter du cache Docker
COPY package.json package-lock.json ./
# Installation propre des dépendances
RUN npm ci

# Copie du reste du code sourc

COPY . .
# Génération des fichiers statiques de prod (dossier dist/ ou build/)
RUN npm run build

# ==========================================
# ÉTAPE 2 : RUNTIME (Serveur web Nginx ultra léger)
# ==========================================
FROM nginx:alpine AS runtime

# Copie des fichiers statiques compilés depuis l'étape builder vers le dossier Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie d'une configuration Nginx personnalisée pour gérer le routing React (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80 (HTTP)
EXPOSE 80

# Nginx démarre automatiquement
CMD["nginx" , "-g", "daemon off;"]

