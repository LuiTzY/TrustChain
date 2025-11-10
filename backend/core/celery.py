from __future__ import absolute_import, unicode_literals
from celery import Celery
from core.env import env
import os


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.environments.local')

print(f"Esta es la variable de entorno {env('DJANGO_SETTINGS_MODULE')}")
app = Celery('core')

app.config_from_object('django.conf.settings', namespace='CELERY')

#Aqui cargamos todas las tareas de celery
app.autodiscover_tasks([
    'src.apps.marketplace.infraestructure.tasks'
])

