# Étape 1 : Build
FROM node:24-alpine AS build
WORKDIR /app
# On copie les fichiers de deps (on est déjà dans /front grâce à Coolify)
COPY package*.json ./
RUN npm install
# On copie tout le reste du dossier /front
COPY . .
RUN npm run build

# Étape 2 : Nginx
FROM nginx:stable-alpine
# On copie le build de Vite vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# CONFIGURATION ANTI-404 POUR REACT (IMPORTANT)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]