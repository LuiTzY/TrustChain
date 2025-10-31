import json
import os

from core.environments.base import BASE_DIR
from ..env import env
from django.conf import settings

#Validamos de que el debug este True y que no estemos corriendo en docker compose
if settings.DEBUG and settings.DOCKER_ENVIRONMENT == False:
    #En desarrollo leeremos el .env del proyecto
    #Leemos el archivo de variables de entorno
    env.read_env(os.path.join(BASE_DIR, '.env'))
    

# == Declarando Variables  ==
HARDHAT_ABI_PATH = env("HARDHAT_ABI_PATH")
HARDHAT_SERVER_URL = env("HARDHAT_SERVER_URL")
HARDHAT_MARKETPLACE_PATH_ADDRESS = env("HARDHAT_MARKETPLACE_PATH_ADDRESS")

#Esta variable la obtendremos por medio del JSON de MarketAddress al hacer el deploy del contrato
with open(HARDHAT_MARKETPLACE_PATH_ADDRESS) as f:
    ADDRESS= json.load(f)['address']
    print(f"Este es el valor obtenido del MarketAddressJson {ADDRESS} \n")
    
    HARDHAT_MARKETPLACE_ADDRESS = ADDRESS

print(f"Este es el ABI ahora {HARDHAT_ABI_PATH} \n MarketAddress {HARDHAT_MARKETPLACE_ADDRESS} \n")