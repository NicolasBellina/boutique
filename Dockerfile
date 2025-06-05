# Stage de build
FROM node:18.19.1-alpine3.19 as builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copie du reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

# Stage de production
FROM node:18.19.1-alpine3.19

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copie des fichiers buildés depuis le stage précédent
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/app.js ./app.js

# Variables d'environnement
ENV NODE_ENV=production

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "app.js"]
