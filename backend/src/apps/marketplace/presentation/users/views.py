from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.infraestructure.repositories.user import DjangoUserRepository, Web3UserRepository
from src.apps.marketplace.infraestructure.generics import GenericJwtViewSet, GenericJwtAPIView
from src.apps.common.response import ApiResponse
from .serializers import UserSerializer
from src.apps.marketplace.application.users.register_user import RegisterUserService
from rest_framework import status
from src.apps.marketplace.application.users.user_balance import UserEthersBalance
from rest_framework.permissions import AllowAny

class UserViewSet(GenericJwtViewSet):
    permission_clases =[AllowAny]
    authentication_clasess=[]
    queryset =  UserModel.objects.all()
    serializer_class = UserSerializer
    repo = DjangoUserRepository()
    
    def list(self, request):
        users = self.repo.list_all()
        serializer =  UserSerializer(users, many=True)
        return ApiResponse.success(data=serializer.data)
        
    def create(self, request):
        service = RegisterUserService(self.repo)
        wallet_service =  Web3UserRepository()
        rq_data = request.data.copy()
        rq_data['wallet_address'] = wallet_service.get_available_wallet() 
        
        serializer = UserSerializer(data=rq_data)
        if serializer.is_valid():
            #Luego de la validacion de la capa de presentacion, sigue la de la regla de negocios
            user_auth = service.execute(serializer.validated_data)
            
            return ApiResponse.success(user_auth, code=status.HTTP_201_CREATED)
        
        #Esto va en la parte del 
        print("No es valido por lo que tenemos errores \n")
        return ApiResponse.error(errors=serializer.errors)




class UserBalanceView(GenericJwtAPIView):
    def __init__(self, **kwargs):
        print(f"Estos son los permisos {self.permission_clases}")
    
    def get(self,request):
        service =  UserEthersBalance()
        try:
            return ApiResponse.success(data = service.get_user_balance(request.user))
        except Exception as e:
            return ApiResponse.error(f"Ocurrio un error al obtener el balance {e}")

        