from src.apps.marketplace.domain.entities.user import AuthCredentials, User
from src.apps.marketplace.infraestructure.services.jwt_service import JwtService

class RegisterUserService:
    
    def __init__(self, repository):
        self.repository = repository
        self.tokens_service = JwtService 
        

    def execute(self, data:dict) -> AuthCredentials:
        print(f"Esta es la data recibida {data}")
        user_data  =  User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username = data['username'],
            email = data['email'], #aqui hay que corregir para cuando sea none o no
            password = data['password'],
            wallet_address=data['wallet_address']
        )
        
        user = self.repository.save(user_data)
        tokens =  self.tokens_service.generate_tokens(user)
        return tokens