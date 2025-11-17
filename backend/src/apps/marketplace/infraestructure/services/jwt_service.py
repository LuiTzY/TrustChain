from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

from src.apps.marketplace.infraestructure.models.user import UserModel

class JwtService:
    @staticmethod
    def generate_tokens(user: UserModel):
        refresh = RefreshToken.for_user(user)
        refresh.access_token_class
        
        refresh['first_name'] = user.first_name
        refresh['last_name'] =  user.last_name
        refresh['username'] = user.username
        refresh['wallet_address'] = user.wallet_address

        return {
            "refresh":str(refresh),
            "access_token":str(refresh.access_token)
        }