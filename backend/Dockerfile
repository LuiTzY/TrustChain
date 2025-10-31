FROM python:3.10.16-alpine3.21

#Establecemos el workingdirectory
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 

#Copiamos el archivo de los requirements al workidir
COPY requirements.txt /app


# RUN apk add --no-cache \
#     musl-dev \
#     # gcc \
#     # mariadb-dev \
#     # mariadb-connector-c-dev \
#     # build-base \
#     libffi-dev \
#     pkgconfig \
#     libsasl \
#     && pip install --upgrade pip --no-compile --no-cache-dir

RUN pip install gunicorn && pip install -r requirements.txt --no-compile --no-cache-dir

#Copiamos los otros archivos
COPY . .

EXPOSE 8000

RUN chmod +x ./sh.sh

#Los servicios basados en esta imagen nos pasaran un comando, para no hacer que la imagen sea poco flexible, celery estaba duplicando el servicio cuando lo requerido era ejecutar el worker y no estaba sucediendo
CMD [ "sh", "-c", "${APP_START_COMMAND}" ]
