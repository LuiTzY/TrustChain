from src.apps.marketplace.domain.exceptions.user import UserNotFound
from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.infraestructure.models.product import ProductModel

class UserProductsListService:
    
    def __init__(self, repository):
        self.repository = repository
        
    def execute(self, user: UserModel, type):
        user_lookup = self.repository.find_by_id(user.id)
        
        wallet = user.wallet_address
        
        query =  ProductModel.objects.all()
        
        for p in query:
            print(f" Producto de:{user.username} {p.seller.wallet_address} es la misma que {wallet} {p.seller.username}")
        print(f"Este es el query {query}")
        if not user_lookup:
            raise UserNotFound()
        
        
        if type == 'seller':
        
            return user.items_selling
        
        return user.items_bought