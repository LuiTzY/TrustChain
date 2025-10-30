import json
import os

from core.environments.base import BASE_DIR
from ..env import env
from django.conf import settings

#Leer las variables de entorno

if settings.DEBUG:
    print("Leeremos desde la config local")
    #Leemos el archivo de variables de entorno
    env.read_env(os.path.join(BASE_DIR, '.env'))
    

HARDHAT_ABI_PATH = env("HARDHAT_ABI_PATH")
HARDHAT_SERVER_URL = env("HARDHAT_SERVER_URL")
HARDHAT_MARKETPLACE_ADDRESS = env("HARDHAT_MARKETPLACE_ADDRESS")

print(f"Este es el ABI ahora {HARDHAT_MARKETPLACE_ADDRESS}")