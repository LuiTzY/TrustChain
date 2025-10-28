import json
import os

from core.environments.base import BASE_DIR
from ..env import env

#Leer las variables de entorno
# env.read_env(os.path.join(BASE_DIR, '.env'))

HARDHAT_ABI_PATH = os.environ.get("HARDHAT_ABI_PATH")
HARDHAT_SERVER_URL = os.environ.get("HARDHAT_SERVER_URL")



HARDHAT_MARKETPLACE_ADDRESS = os.environ.get("HARDHAT_MARKETPLACE_ADDRESS")

print(f"Este es el ABI ahora {HARDHAT_MARKETPLACE_ADDRESS}")