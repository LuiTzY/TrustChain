from src.apps.marketplace.domain.entities import Product


class ServiceProductWeb3:
    """
        
        Servicio que se encargara de interactuar con la creacion
        
    """ 
    
    def __init__(self, web3_repository):
        self.web3_repository = web3_repository    
    
    def execute(self, event_data: dict):
        
        # entity = Product(
        #     id=event_data['id'],
        #     name=event_data["name"],
        #     price=float(event_data["price"]),
        #     seller_wallet=event_data["seller"],
        #     status="listed"
        # )
        
        
        
        #interactuamos con la blockchian para crear el product
        data = self.web3_repository.create(event_data)
        print("Esta es la data")
        
        #no interactuamos con ningun otro repo, ya que el listener se
        #encargara de crearlo 