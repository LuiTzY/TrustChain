import json
from web3 import Web3
from src.apps.marketplace.domain.interfaces import (IWeb3ProductRepositroy)
from core.environments.variables import HARDHAT_MARKETPLACE_ADDRESS, HARDHAT_SERVER_URL,HARDHAT_ABI_PATH
from src.apps.marketplace.domain.entities.product import Product



class DjangoWeb3Repository(IWeb3ProductRepositroy):
    """
        Repositorio para manejar la integracion con web3
        estas integraciones se deberan de hacer desde el lado
        del cliente, ya que van a requerir de un private key
        que se obtiene con metamask
    """
    
    def __init__(self):
        #nos conectamos al nodo del hardhat
        self.w3 = Web3(Web3.HTTPProvider(HARDHAT_SERVER_URL))
        self.contract_address = HARDHAT_MARKETPLACE_ADDRESS
        
        self.load_abi()
        self.load_contract()

    def load_abi(self):
        with open(HARDHAT_ABI_PATH) as f:
            self.abi = json.load(f)["abi"] 
            
    def get_chain_id(self):
        return self.w3.eth.chain_id
        
    def load_contract(self):
        self.contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)

    def create(self, product):
                

        # elegimos una cuenta de prueba (realmente debemos de pasar el wallet addres del user que esta haciendo la request)
        account = self.w3.eth.accounts[0] 
        
        #convertirmos el precio en eth
        price_in_ethers = Web3.to_wei(product['price'],"ether")
        
        # creamos la transaccion
        tx = self.contract.functions.listItem(product['name'],product['description'], price_in_ethers).build_transaction({
            "from": account,
            "nonce": self.w3.eth.get_transaction_count(account), #obtiene el id en memoria del nodo del hardhat
            "gas": 2000000,
            "gasPrice": self.w3.eth.gas_price,
        })

        
        #logica de la bd para guardar la transacion del producto, aqui deberiamos utilizar otro repo como el de los payments

        
        #enviamos la transaccion
        tx_hash = self.w3.eth.send_transaction(tx)

        # esperamos la confirmacion
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)

        
        return {
            "tx_hash": tx_hash.hex(),
            "block_number": receipt.blockNumber,
            "status": receipt.status,
        }
        
    def buy(self, product_id: int):
        """
            Este metodo se encargara de interactuar con la blockchian para comprar un item,
            el evento emitido por esto sera reaccionado en un listener que luego lo registrara
            en la bd
        """
        print(f"Vamos a hacer la compra, este es el ID del producto {product_id}")
        #Direccion del comprador
        BUYER_ADDRESS= "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
        
        #convertir la direccion a un address valido
        
        BUYER_ADDRESS =  Web3.to_checksum_address(BUYER_ADDRESS)
        
        BUYER_PRIVATE_KEY = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
        
        product =  self.contract.functions.items(product_id).call()
        price_wei =  product[3]
        
        print(f"Precio del item: {self.w3.from_wei(price_wei, 'ether')} ETH")
        # --- CONSTRUCCIÓN DE LA TRANSACCIÓN ---
        nonce = self.w3.eth.get_transaction_count(BUYER_ADDRESS)

        transaction = self.contract.functions.buyItem(product_id).build_transaction({
            'from': BUYER_ADDRESS,
            'value': price_wei,          # msg.value exacto
            'nonce': nonce,
            'gas': 300000,
            'gasPrice': self.w3.to_wei('20', 'gwei'),
        })

        # --- FIRMA Y ENVÍO ---
        signed_tx = self.w3.eth.account.sign_transaction(transaction, BUYER_PRIVATE_KEY)
        print(f"Esto es lo que devuelve la firma de la transaccion {signed_tx.raw_transaction}")
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.raw_transaction)

        print(f"Transacción enviada: {self.w3.to_hex(tx_hash)}")

        # --- ESPERAMOS CONFIRMACIÓN ---
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        print("Transacción confirmada en bloque:", tx_receipt.blockNumber)

        # --- MOSTRAR NUEVO ESTADO DEL ITEM ---
        updated_item = self.contract.functions.items(product_id).call()
        print("Estado del item después de la compra:")
        print(f"  Sold: {updated_item[5]}")
        print(f"  Owner: {updated_item[4]}")