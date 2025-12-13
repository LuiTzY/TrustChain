from .base import *
from django.conf import settings
from core.env import env

DEBUG  = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default':{
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': f'{env("DATABASE_NAME")}',
#         'USER': f'{env("DATABASE_USER")}',
#         'PASSWORD': f'{env("DATABASE_PASSWORD")}',
#         'HOST': f'{env("DATABASE_HOST")}',
#         'PORT': f'{env("DATABASE_PORT")}'
#     }
# }

CELERY_BROKER_URL = "redis://127.0.0.1:6379/"


#Configuracion tomado para los chats
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}