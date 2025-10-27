from src.apps.marketplace.domain.exceptions.product import ProductNotFound


class BuyProductWeb3:
    
    def __init__(self, web3_repository,repository):
        self.web3_repository = web3_repository
        self.repository = repository
        
    def execute(self, id: int):
        
        product = self.repository.find_by_id(id)    
        self.web3_repository.buy(product.blockchain_id)