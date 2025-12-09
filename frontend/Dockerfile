# ============================
# 1) STAGE: Build React App
# ============================
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production=false

# Copiar el resto del proyecto
COPY . .

#Antes del build le asignamos las variables que leera

ARG VITE_APP_API_BASE_URL
ARG VITE_APP_API_WEBSOCKET_BASE_URL

# ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL
# ENV VITE_APP_API_WEBSOCKET_BASE_URL=$VITE_APP_API_WEBSOCKET_BASE_URL

# RUN echo "VITE_APP_API_BASE_URL: $VITE_APP_API_BASE_URL"
# RUN echo "VITE_APP_API_WEBSOCKET_BASE_URL: $VITE_APP_API_WEBSOCKET_BASE_URL"

# compilamos
RUN npm run build


# Server de nginx
FROM nginx:stable-alpine AS production

# Removemos la conf por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivo de build al contenedor de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar archivo de conf personalizado de nginx (
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
