from web3 import Web3
from core.environments.variables import HARDHAT_SERVER_URL
from src.apps.marketplace.domain.entities.user import User
from src.apps.marketplace.domain.interfaces import IUserRepository, IWeb3UserRepository
from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.domain.exceptions.user import UserNotFound,UserUnknownError
from requests.exceptions import ConnectionError

class DjangoUserRepository(IUserRepository):
    
    def save(self, entity: User):
        user = UserModel(
            first_name = entity.first_name,
            last_name = entity.last_name,
            email=entity.email,
            username = entity.username,
            password =  entity.password,
            wallet_address = entity.wallet_address
        )
        
        #aqui encriptamos la password
        user.set_password(entity.password)
        user.save()
        return user
    
    def find_by_id(self, user_id):
        try:
            return UserModel.objects.get(id=user_id)
        except UserModel.DoesNotExist:
            raise UserNotFound()
        
        except Exception as e :
            raise UserUnknownError(f"Ocurrio un error inesperado {e}")
        
    
    def list_all(self) -> list[UserModel]:
        return UserModel.objects.all()
    
    def get_by_wallet(self, wallet_address):
        print(f"Este es el wallet {wallet_address}")
        try:
            return UserModel.objects.get(wallet_address=wallet_address)
        except UserModel.DoesNotExist:
            raise UserNotFound()
        except Exception as e :
            raise UserUnknownError(f"Ocurrio un error inesperado {e}")

    def get_count(self)-> int:
        return UserModel.objects.count()
    
class Web3UserRepository(IWeb3UserRepository):
    
    def __init__(self):
        self.web3 = self._init_web3_connection()
        
    def _init_web3_connection(self):
            """
                Este metodo inicializa la conexion al nodo de la blockchain
            """
            w3 = Web3(Web3.HTTPProvider(HARDHAT_SERVER_URL))

            if not w3.is_connected():
                raise ConnectionError("No se pudo conectar al nodo de la blockchain (RPC).")
            return w3

            
    def get_available_wallet(self):
        
        all_accounts = self.web3.eth.accounts
        used_wallets = set(UserModel.objects.exclude(wallet_address__isnull=True).values_list('wallet_address', flat=True))
        
        
        for acc in all_accounts:
            print(f"Esta es la cuenta de ethereum {acc}")
            if acc not in used_wallets:
                return acc
        raise Exception("No Hay wallets disponibles")


    def get_wallet_balance(self, wallet):
        balance_wei = self.web3.eth.get_balance(wallet)
        balance_eth = Web3.from_wei(balance_wei, 'ether')
        return float(balance_eth)