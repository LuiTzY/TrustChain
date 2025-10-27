from src.apps.marketplace.domain.entities.product import Product

class ListProductService:
    """Caso de uso  """
    
    
    def __init__(self, repository):
        self.repository = repository

    def execute(self, data: dict):
        """
            No handleamos ninguna exepcion ya que fue validado anteriormente por el serializador
            estas son reglas de negocio simplemente.
            
            Desde aca ejecutaremos todas las validaciones de DJANGO
        """

        entity = Product(
            id=data['blockchain_id'],
            name=data["name"],
            price=data["price"],
            description=data.get("description",None),
            seller_wallet=data["seller"].wallet_address,
        )
        
        
        return self.repository.save(entity)