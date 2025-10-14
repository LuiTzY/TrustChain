from src.apps.users.models import User
from src.apps.marketplace.domain.interfaces import (ProductRepositoryInterface,IUserRepository,IWeb3ProductRepositroy)

from src.apps.marketplace.domain.entities import Product
from src.apps.marketplace.infraestructure.models import ProductModel
from src.apps.marketplace.domain.exceptions import (ProductNotFound)


from web3 import Web3
import json
from core.environments.variables import HARDHAT_MARKETPLACE_ADDRESS, HARDHAT_SERVER_URL,HARDHAT_ABI_PATH

class DjangoProductRepository(ProductRepositoryInterface):
    """ Implementacion concrecta del repositiorio utilziando el ORM de django para el CRUD de los productos"""
    
    def save(self, entity:Product) -> ProductModel:
        
        print(entity.price)
        #Aqui obtenemos el usuario con el wallet, para pasarselo
        user_seller = User.objects.get(wallet_address=entity.seller_wallet)
        product = ProductModel.objects.create(
            blockchain_id = entity.id,
            name = entity.name,
            price = entity.price,
            description = entity.description,
            seller = user_seller,
            status = entity.status
        )
        return product
    
    
    def find_by_id(self, item_id: int):
        try:
            return ProductModel.objects.get(id=item_id)
        except ProductModel.DoesNotExist:
            raise ProductNotFound(f"Item con ID {item_id} no encontrado.")

    def list_all(self) -> list[ProductModel] :
        return ProductModel.objects.all()

    def update_status(self, item_id: int, new_status: str) -> ProductModel:
        item = self.find_by_id(item_id)
        item.status = new_status
        item.save()
        return item


# class DjangoUserRepository(IUserRepository):
    
    
#     def get_by_wallet(self, wallet_address):



class DjangoWeb3Repository(IWeb3ProductRepositroy):
    
    def create():
        
        #nos conectamos al nodo del hardhat
        w3 = Web3(Web3.HTTPProvider(HARDHAT_SERVER_URL))

        # direccion del contrato
        contract_address = HARDHAT_MARKETPLACE_ADDRESS

        with open(HARDHAT_ABI_PATH) as f:
            abi = json.load(f)["abi"] 
            
        #nos conectamos al contrato
        contract = w3.eth.contract(address=contract_address, abi=abi)

        # elegimos una cuenta de prueba (realmente debemos de pasar el wallet addres del user que esta haciendo la request)
        account = w3.eth.accounts[0] 
        
        # creamos la transaccion
        tx = contract.functions.listItem("Laptop ASUS", 2000000000000000000).build_transaction({
            "from": account,
            "nonce": w3.eth.get_transaction_count(account), #obtiene el id en memoria del nodo del hardhat
            "gas": 2000000,
            "gasPrice": w3.eth.gas_price,
        })

        
        #logica de la bd para guardar la transacion del producto, aqui deberiamos utilizar otro repo como el de los payments


        #enviamos la transaccion
        tx_hash = w3.eth.send_transaction(tx)

        # esperamos la confirmacion
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
