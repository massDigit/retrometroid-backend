# Utiliser une image de base officielle pour Node.js
FROM node:lts

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Copier le fichier .env dans le conteneur
COPY .env ./

# Installer les dépendances
RUN yarn install

# Copier le reste du code de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["node", "app.js"]