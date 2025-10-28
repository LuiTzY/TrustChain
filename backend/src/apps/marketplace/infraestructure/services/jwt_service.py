from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

from src.apps.marketplace.infraestructure.models.user import UserModel

class JwtService:
    @staticmethod
    def generate_tokens(user: UserModel):
        refresh = RefreshToken.for_user(user)
        return {
            "refresh":str(refresh),
            "access_token":str(refresh.access_token)
        }