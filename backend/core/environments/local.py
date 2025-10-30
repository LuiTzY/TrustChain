from .base import *
from django.conf import settings
DEBUG  = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CELERY_BROKER_URL = "redis://127.0.0.1:6379/"