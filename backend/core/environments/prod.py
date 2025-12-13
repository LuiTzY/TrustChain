from .base import *
from core import env
from core.environments.base import BASE_DIR


print("Estamos tomando la config del ambiente de PROD\n")

DEBUG = True
DOCKER_STATUS=True
CELERY_BROKER_URL = "redis://host.docker.internal:6379/"

DATABASES = {
    'default':{
        'ENGINE': 'django.db.backends.mysql',
        'NAME': f'{os.environ.get("DATABASE_NAME_PROD")}',
        'USER': f'{os.environ.get("DATABASE_USER_PROD")}',
        'PASSWORD': f'{os.environ.get("DATABASE_PASSWORD_PROD")}',
        'HOST': f'{os.environ.get("DATABASE_HOST_PROD")}',
        'PORT': f'{os.environ.get("DATABASE_PORT_PROD")}'
    }
}

ALLOWED_HOSTS = ['host.docker.internal','localhost']


#Configuracion tomado para los chats
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('host.docker.internal', 6379)],
        },
    },
}