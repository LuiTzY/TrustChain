from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

class JwtAuthMixin:
    """ Representacion de las clases de autenticacion y permisos base """
    authentication_clasess = [JWTAuthentication]
    permission_clases = [IsAuthenticated]
    
class GenericJwtViewSet(JwtAuthMixin,viewsets.ModelViewSet):
    """
        ViewSet generico que cuenta con autenticacion con JWT
    """
    pass
    
    
class GenericJwtAPIView(JwtAuthMixin,viewsets.ModelViewSet):
    """
        Api View generico que cuenta con autenticacion con JWT
    """
    pass