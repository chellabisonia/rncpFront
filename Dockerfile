# ====== Étape 1 : build ======
FROM node:24-alpine AS build

WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm install

# Copie du code
COPY .. .

# Build Vite
RUN npm run build


# ====== Étape 2 : serveur nginx ======
FROM nginx:alpine

# Supprime la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie notre config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie le build Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

