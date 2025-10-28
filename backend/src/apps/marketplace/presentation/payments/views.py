from src.apps.common.response import ApiResponse
from src.apps.marketplace.infraestructure.generics import GenericJwtAPIView
from .serializers import PaymentSerializer
from src.apps.marketplace.infraestructure.repositories.payments import DjangoPaymentRepository

class PaymentApiView(GenericJwtAPIView):
    repo =  DjangoPaymentRepository()
    def get(self, request):
        data = PaymentSerializer(self.repo.list_all(), many=True).data
        
        return ApiResponse.success(data=data)