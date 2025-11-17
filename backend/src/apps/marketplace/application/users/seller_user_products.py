from src.apps.marketplace.domain.exceptions.user import UserNotFound


class UserSellerProductsService:
    
    def __init__(self, repository):
        self.repository = repository
        
    def execute(self, id: int):
        user_lookup = self.repository.find_by_id(id)
        
        if not user_lookup:
            raise UserNotFound()
        
        return user_lookup.items_selling
        