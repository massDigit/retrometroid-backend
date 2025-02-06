# Étape 1 : Build
FROM node:16 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production
RUN npm install --only=production

# Copier le reste du code source
COPY . .

# Compiler le code TypeScript
RUN npm run build

# Étape 2 : Exécution
FROM node:16 AS runner

WORKDIR /app

# Copier le code compilé depuis l'étape de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/app.js"]
