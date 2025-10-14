# src/apps/marketplace/infrastructure/listeners/product_event_listener.py

from web3 import Web3
import json
from src.apps.marketplace.application.products.create_product_event import CreateProductFromEventService
from src.apps.marketplace.infraestructure.repositories import DjangoProductRepository
from core.environments.variables import *

class ProductEventListener:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(HARDHAT_SERVER_URL))
        contract_address = HARDHAT_MARKETPLACE_ADDRESS
        
        with open(HARDHAT_ABI_PATH) as f:
            abi = json.load(f)["abi"]
        print("Este es el AVI")
        self.contract = self.w3.eth.contract(address=contract_address, abi=abi)

    def listen_item_listed(self):
        event_filter = self.contract.events.ItemListed.create_filter(from_block="latest")
        repo = DjangoProductRepository()
        service = CreateProductFromEventService(repo)

        print("Escuchando eventos ItemListed para agregar los productos...")
        while True:
            for event in event_filter.get_new_entries():
                args = event["args"]
                print(f" Producto  detectado en harhat blockchain: {args}")
                #Llamamos al servicio para que guardar en el repo
                service.execute(args)
