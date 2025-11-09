FROM python:3.10.16-alpine3.21

# Variables de entorno para optimizar Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Establecemos el working directory
WORKDIR /app

# Copiamos el archivo de requirements para instalar las depedencias
COPY requirements.txt /app

# Instalamos dependencias del sistema y de python para el proyecto
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    mariadb-dev \
    mariadb-connector-c-dev \
    python3-dev \
    libffi-dev \
    pkgconfig \
    && apk add --no-cache \
    mariadb-connector-c \
    libffi \
    libsasl \
    && pip install --no-cache-dir gunicorn \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps \
    && rm -rf /root/.cache

# Copiamos los otros archivos
COPY . .

# Creamos un usuario que no sea root para temas de seguridad 
RUN addgroup -g 1000 django \
    && adduser -D -u 1000 -G django django \
    && chmod +x ./sh.sh \
    && chown -R django:django /app 

# Cambiamos al usuario no-root
USER django

# Exponemos el puerto
EXPOSE 8000

# Comando flexible según variable de entorno
CMD ["sh", "-c", "${APP_START_COMMAND}"]