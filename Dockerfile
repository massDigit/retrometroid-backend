# Étape 1 : Builder
FROM node:16 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances de développement et de production
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Compiler le code TypeScript
RUN npm run build && ls -la dist


# Étape 2 : Exécuter
FROM node:16 AS runner


WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/app.js"]
