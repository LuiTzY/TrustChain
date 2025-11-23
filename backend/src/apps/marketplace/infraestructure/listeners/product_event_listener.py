import json
from web3 import Web3
from src.apps.marketplace.domain.entities.payment import Payment
from src.apps.marketplace.application.products.buy_product_service import BuyProductFromEventService
from src.apps.marketplace.infraestructure.repositories.payments import DjangoPaymentRepository
from src.apps.marketplace.infraestructure.models.payments import PaymentModel
from src.apps.marketplace.application.products.create_product_event import CreateProductFromEventService
from src.apps.marketplace.infraestructure.repositories.product import DjangoProductRepository
from core.environments.variables import *

class ProductEventListener:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(HARDHAT_SERVER_URL))
        contract_address = HARDHAT_MARKETPLACE_ADDRESS
        
        with open(HARDHAT_ABI_PATH) as f:
            abi = json.load(f)["abi"]
        print("Este es el AVI")
        self.contract = self.w3.eth.contract(address=contract_address, abi=abi)
        
        self.listed_filter = self.contract.events.ItemListed.create_filter(from_block="latest")
        self.purchased_filter = self.contract.events.ItemPurchased.create_filter(from_block='latest')
        self.cancel_filter = self.contract.events.ItemCanceled.create_filter(from_block='latest')


    def run(self):
        print(f"Estamos escuchando los eventos supuestamente")
        while True:
            for event in self.listed_filter.get_new_entries():
                print(f"Filtro cargado!! : Estaremos creando los productos\n")
                args = event["args"]
                repo = DjangoProductRepository()
                service = CreateProductFromEventService(repo)
                print(f" Producto  detectado en harhat blockchain: {args}")
                #Llamamos al servicio para que guardar en el repo
                
                try:
                    service.execute(args)
                except Exception as e:
                    print(f"Ocurrio el error de registro {e} \n")
                    continue
            
            for event in self.cancel_filter.get_new_entries():
                #Buscar el producto y actualizar su estado
                repo = DjangoProductRepository()
                
                product =  repo.find_by_blockchain_id(event['id'])
                
                repo.update_status(product.id,'cancel')
                
                
            for event in self.purchased_filter.get_new_entries():
                print(f"Escuchando eventos de compra")
                args = event["args"]
                tx_hash = event["transactionHash"].hex()
                print(f"Esta es la data del evento {event['args']}")
                                
                repo = DjangoPaymentRepository()
                product_repo = DjangoProductRepository()
                
                transaction = repo.find_by_tx_hash(tx_hash)
                if not transaction:
                    #aqui registramos la transaccion
                    product = product_repo.find_by_blockchain_id(args['id'])
                    
                    transaction_payment = Payment(
                        tx_hash=tx_hash,
                        buyer_address=args['buyer'],
                        seller_address=args['seller'],
                        product=product.id,
                        amount=self.w3.from_wei(args["price"], "ether"),
                        status="confirmed"
                    )
                    
                    #por temas de validacion, pasamos la instancia correctamente para guardar el producto
                    transaction_payment.product = product
                    #guardamos la transaccion
                    repo.save(transaction_payment)
                

                service = BuyProductFromEventService(product_repo)
                #actualizamos el estatus del item a vendido, pasandole el ID del producto de la blockchain
                service.execute(args['id'])

  
