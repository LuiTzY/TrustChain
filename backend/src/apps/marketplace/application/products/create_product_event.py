
from src.apps.marketplace.domain.entities.product import Product


class CreateProductFromEventService:
    """
        Servicio que se encargara de crear los productos por los eventos
        emitidos en el nodo de blockchain
    """
    
    def __init__(self, repository):
        self.repository = repository
    
    
    def execute(self, event_data: dict):
        entity = Product(
            id=event_data['id'],
            name=event_data["name"],
            price=float(event_data["price"]),
            seller_wallet=event_data["seller"],
            status="listed"
        )
        self.repository.save(entity)