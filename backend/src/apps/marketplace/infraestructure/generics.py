from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView

class JwtAuthMixin:
    """ Representacion de las clases de autenticacion y permisos base """
    authentication_clasess = [JWTAuthentication]
    permission_clases = [IsAuthenticated]
    
class GenericJwtViewSet(JwtAuthMixin,viewsets.ModelViewSet):
    """
        ViewSet generico que cuenta con autenticacion con JWT
    """
    pass
    
    
class GenericJwtAPIView(JwtAuthMixin,APIView):
    permission_clases = [IsAuthenticated]
    """
        Api View generico que cuenta con autenticacion con JWT
    """
    pass