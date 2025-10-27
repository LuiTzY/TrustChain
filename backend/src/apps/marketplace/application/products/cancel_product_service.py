# apps/marketplace/product/application/services/cancel_item_service.py

from ...domain.exceptions.product import ProductNotFound, InvalidOperation

class CancelItemService:
    """Caso de uso: cancelación de un producto publicado."""
    def __init__(self, repository):
        self.repository = repository

    def execute(self, item_id):
        item = self.repository.find_by_id(item_id)
        if item.status == "sold":
            raise InvalidOperation("No se puede cancelar un producto ya vendido.")
        
        self.repository.update_status(item_id, "cancelled")
        return item
