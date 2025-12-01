from src.apps.marketplace.domain.exceptions.user import UserNotFoundWallet
from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.infraestructure.repositories.user import Web3UserRepository
from src.apps.marketplace.infraestructure.repositories.user import DjangoUserRepository

class UserEthersBalance:
    
    def __init__(self):
        self.repository = DjangoUserRepository() 
        self.web3_user_repository = Web3UserRepository()
    
    def get_user_balance(self, user: UserModel):
        wallet: UserModel = self.repository.get_by_wallet(user.wallet_address)
        
        if not wallet:
            raise UserNotFoundWallet()
        
        user_balance = self.web3_user_repository.get_wallet_balance(wallet.wallet_address)
        return user_balance