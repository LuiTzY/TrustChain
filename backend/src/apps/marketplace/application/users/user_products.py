from src.apps.marketplace.domain.exceptions.user import UserNotFound
from src.apps.marketplace.infraestructure.models.user import UserModel


class UserProductsListService:
    
    def __init__(self, repository):
        self.repository = repository
        
    def execute(self, user: UserModel, type):
        user_lookup = self.repository.find_by_id(user.id)
        
        if not user_lookup:
            raise UserNotFound()
        
        
        if type == 'seller':
        
            return user.items_selling
        
        return user.items_bought