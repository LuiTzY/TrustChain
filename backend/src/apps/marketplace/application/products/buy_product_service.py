# apps/marketplace/product/application/services/buy_item_service.py

from ...domain.exceptions.product import InvalidOperation

class BuyProductFromEventService:
    """
        Compra de un producto, este servicio sera utilizado dentro de un listener
        para reaccionar al evento de la compra
    """
    def __init__(self, repository):
        self.repository = repository

    def execute(self, item_id):
        item = self.repository.find_by_blockchain_id(item_id)
        
        if item.status != "listed":
            raise InvalidOperation("El producto ya fue vendido o cancelado.")
        
        self.repository.update_status(item.id, "sold")
        return item
