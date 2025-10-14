import os

from core.environments.base import BASE_DIR
from ..env import env

#Leer las variables de entorno
env.read_env(os.path.join(BASE_DIR, '.env'))

HARDHAT_ABI_PATH = env("HARDHAT_ABI_PATH")
HARDHAT_SERVER_URL = env("HARDHAT_SERVER_URL")
HARDHAT_MARKETPLACE_ADDRESS = env("HARDHAT_MARKETPLACE_ADDRESS") 