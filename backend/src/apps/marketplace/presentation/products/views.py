from src.apps.marketplace.infraestructure.models.product import ProductModel
from src.apps.marketplace.infraestructure.repositories.web3 import DjangoWeb3Repository
from src.apps.marketplace.infraestructure.repositories.product import DjangoProductRepository
from src.apps.marketplace.application.products.cancel_product_service import CancelItemService
from src.apps.marketplace.application.products.list_product_service import ListProductService
from .serializers import ProductSerializer
from src.apps.marketplace.infraestructure.generics import GenericJwtViewSet, GenericJwtAPIView
from src.apps.common.response import ApiResponse
from src.apps.marketplace.application.products.create_product_web3  import ServiceProductWeb3
from src.apps.marketplace.application.products.buy_product_web3 import BuyProductWeb3
from rest_framework import status


class ProductViewSet(GenericJwtViewSet):
    serializer_class = ProductSerializer
    repo = DjangoProductRepository()
    queryset = ProductModel.objects.all()
    
    def list(self, request):
        items = self.repo.list_all()
        serializer = ProductSerializer(items,many=True)
        return ApiResponse.success(data=serializer.data) 
    
    def create(self, request):
        
        service = ServiceProductWeb3(DjangoWeb3Repository())
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            #Luego de la validacion de la capa de presentacion, sigue la de la regla de negocios
            item = service.execute(serializer.validated_data)
            return ApiResponse.success(ProductSerializer(serializer.data).data, code=status.HTTP_201_CREATED)
        
        #Esto va en la parte del 
        print("No es valido por lo que tenemos errores \n")
        return ApiResponse.error(errors=serializer.errors)

    # def update(self, request, pk=None):
    #     """Actualizar estado: vendido o cancelado."""
        
    #     #Esta validacion debe de hacerse directamente en el serializador
    #     action = request.data.get("action")
    #     # if action == "buy":
    #     #     service = BuyItemService(self.repo)
    #     # elif action == "cancel":
    #     #     service = CancelItemService(self.repo)
    #     # else:
    #     #     return ApiResponse.error(message={"error": "Acción inválida."})

    #     item = service.execute(pk)
    #     serializer = ProductSerializer(item)
        
    #     if serializer.is_valid():
    #         return ApiResponse.success(serializer.data)
        
    #     return ApiResponse.error(errors=serializer.errors)


class BuyProductApiView(GenericJwtAPIView):
    
    def get(self, request, id):
        print(f"Este es el ID{id} \n")
        web3_repo = BuyProductWeb3(DjangoWeb3Repository(), DjangoProductRepository())
        
        try:
            web3_repo.execute(id)
        
        except Exception as e:
            return ApiResponse.error(f"Ocurrio {e}")
        
        return ApiResponse.success("Todo en orde para la compra")