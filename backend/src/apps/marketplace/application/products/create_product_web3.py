from src.apps.marketplace.domain.entities.product import Product


class ServiceProductWeb3:
    """
        
        Servicio que se encargara de interactuar con la creacion
        
    """ 
    
    def __init__(self, web3_repository):
        self.web3_repository = web3_repository    
    
    def execute(self, event_data: dict):        
        #interactuamos con la blockchian para crear el product
        data = self.web3_repository.create(event_data)
         