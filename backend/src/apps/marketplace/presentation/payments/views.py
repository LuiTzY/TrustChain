from src.apps.marketplace.application.users.RecentPayments import UserRecentPaymentService
from src.apps.common.response import ApiResponse
from src.apps.marketplace.infraestructure.generics import GenericJwtAPIView
from .serializers import PaymentSerializer
from src.apps.marketplace.infraestructure.repositories.payments import DjangoPaymentRepository

class PaymentApiView(GenericJwtAPIView):
    repo =  DjangoPaymentRepository()
    def get(self, request):
        data = PaymentSerializer(self.repo.list_all(), many=True).data
        
        return ApiResponse.success(data=data)
    
    

class UserRecentPaymentsView(GenericJwtAPIView):
    repo =  DjangoPaymentRepository()
    service = UserRecentPaymentService(repo)
    
    def get(self,request):
        
        recent_payments = self.service.execute(request.user.wallet_address)
        if not recent_payments:
            recent_payments = []
        return ApiResponse.success(data=recent_payments,message="Pagos recientes")
        