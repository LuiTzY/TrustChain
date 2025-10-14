# apps/marketplace/product/application/services/buy_item_service.py

from ...domain.exceptions import ProductNotFound, InvalidOperation

class BuyItemService:
    """Caso de uso: compra de un producto."""
    def __init__(self, repository):
        self.repository = repository

    def execute(self, item_id):
        item = self.repository.find_by_id(item_id)
        if item.status != "listed":
            raise InvalidOperation("El producto ya fue vendido o cancelado.")
        
        self.repository.update_status(item_id, "sold")
        return item
