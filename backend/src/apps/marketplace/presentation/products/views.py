from src.apps.marketplace.application.products.buy_product_service import BuyItemService
from src.apps.marketplace.application.products.cancel_product_service import CancelItemService
from src.apps.marketplace.application.products.list_product_service import ListProductService
from .serializers import ProductSerializer
from src.apps.marketplace.infraestructure.generics import GenericJwtViewSet
from src.apps.marketplace.infraestructure.repositories import DjangoProductRepository
from src.apps.common.response import ApiResponse

from rest_framework import status

class ProductViewSet(GenericJwtViewSet):
    serializer_class = ProductSerializer
    repo = DjangoProductRepository()
    
    def list(self, request):
        items = self.repo.list_all()
        serialezer = ProductSerializer(items,many=True)
        return ApiResponse.success(data=serialezer.data) 
    
    def create(self, request):
        
        service = ListProductService(self.repo)
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            #Luego de la validacion de la capa de presentacion, sigue la de la regla de negocios
            item = service.execute(serializer.validated_data)
            return ApiResponse.success(serializer.data, code=status.HTTP_201_CREATED)
        
        #Esto va en la parte del 
        print("No es valido por lo que tenemos errores \n")
        return ApiResponse.error(errors=serializer.errors)

    def update(self, request, pk=None):
        """Actualizar estado: vendido o cancelado."""
        
        #Esta validacion debe de hacerse directamente en el serializador
        action = request.data.get("action")
        if action == "buy":
            service = BuyItemService(self.repo)
        elif action == "cancel":
            service = CancelItemService(self.repo)
        else:
            return ApiResponse.error(message={"error": "Acción inválida."})

        item = service.execute(pk)
        serializer = ProductSerializer(item)
        
        if serializer.is_valid():
            return ApiResponse.success(serializer.data)
        
        return ApiResponse.error(errors=serializer.errors)