from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class BaseViewSet(ModelViewSet):
    """
        ViewSet Generico que sirve como base para utilizar la autenticacion de JWT
        
    """
    authentication_classes = [ JWTAuthentication ]
    permission_classes = [ IsAuthenticated ]