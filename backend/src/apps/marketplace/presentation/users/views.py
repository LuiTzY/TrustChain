from src.apps.marketplace.application.users.seller_user_products import UserSellerProductsService
from src.apps.marketplace.presentation.products.serializers import ProductSerializer
from src.apps.marketplace.application.users.user_products import UserProductsListService
from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.infraestructure.repositories.user import DjangoUserRepository, Web3UserRepository
from src.apps.marketplace.infraestructure.generics import GenericJwtViewSet, GenericJwtAPIView
from src.apps.common.response import ApiResponse
from .serializers import UserProductSellerSerializer, UserProductTypeListSerializerOptions, UserSerializer, UserTokenObtainSerializer
from src.apps.marketplace.application.users.register_user import RegisterUserService
from rest_framework import status
from src.apps.marketplace.application.users.user_balance import UserEthersBalance
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    permission_clases = [AllowAny]
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
        
        return ApiResponse.error(errors=serializer.errors)

    def update(self, request, pk=None, *args, **kwargs):
        print(f"Esta es la data entrante {request.data}")
        try:
            # Obtener el usuario a actualizar
            user = self.repo.find_by_id(pk)
            
            # partial=True permite actualizar solo los campos enviados
            partial = kwargs.pop('partial', request.method == 'PATCH')
            
            serializer = UserSerializer(
                user, 
                data=request.data, 
                partial=partial
            )
            
            if serializer.is_valid():
                # Si hay un servicio de actualización, úsalo
                # Si no, actualiza directamente
                updated_user = serializer.save()
                
                response_serializer = UserSerializer(updated_user)
                return ApiResponse.success(
                    data=response_serializer.data,
                    message="Usuario actualizado correctamente"
                )
            
            return ApiResponse.error(errors=serializer.errors)
            
        except UserModel.DoesNotExist:
            return ApiResponse.error(
                message="Usuario no encontrado",
                code=status.HTTP_404_NOT_FOUND
            )


class UserBalanceView(GenericJwtAPIView):
 
    def get(self,request):
        service =  UserEthersBalance()
        try:
            return ApiResponse.success(data = service.get_user_balance(request.user))
        except Exception as e:
            return ApiResponse.error(f"Ocurrio un error al obtener el balance {e}")

        
        
class UserAuthView(TokenObtainPairView):
    """
        Vista utilizada para la autenticacion devolviendo los tokens con claims
    """
    serializer_class = UserTokenObtainSerializer
    


class UserProducts(GenericJwtAPIView):
    """
        Vista encargada de retornar los productos vendidos o comprados del usuario
        que haga la solicitud
    """
    def get(self, request):
        
        print(f"Este es el usuario en la request {self.request.user.items_selling}")
        print
        repo = DjangoUserRepository()
        service = UserProductsListService(repo)
        serializer = UserProductTypeListSerializerOptions(data=self.request.query_params)
        if serializer.is_valid():

            data = service.execute(self.request.user, serializer.validated_data['list_type'])
            print(f"Esta es la data que obtuvimos {data} \n")
            return ApiResponse.success(data=ProductSerializer(data,many=True).data)
        
        return ApiResponse.error(errors=serializer.errors)


class UserSellerProducts(GenericJwtAPIView):
    """
        Vista encargada de retornar los productos vendidos por un usuario en especifico
    """
    def get(self, request, id):
        repo = DjangoUserRepository()
        service = UserSellerProductsService(repo)
        if id:
            data = service.execute(id)
            return ApiResponse.success(data=ProductSerializer(data,many=True).data)
        
        return ApiResponse.error()