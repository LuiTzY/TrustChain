from .user import DjangoUserRepository
from .payments import DjangoPaymentRepository
from .product import DjangoProductRepository

class DjangoInsightsRepository:
    
    
    def __init__(self):
        self._user_repo =   DjangoUserRepository()
        self._product_repo = DjangoProductRepository()
        self._payments_repo = DjangoPaymentRepository()
        
    
    def get_insigths(self):
        return {
            "users":self._user_repo.get_count(),
            "payments":self._payments_repo.get_count(),
            "products":self._product_repo.get_count(),
            "sellers":self._product_repo.get_seller_count()
        }