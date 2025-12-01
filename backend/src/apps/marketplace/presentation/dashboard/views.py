

from src.apps.common.response import ApiResponse
from src.apps.marketplace.application.dashboard.insights import GetInsigthsService
from src.apps.marketplace.infraestructure.generics import GenericJwtAPIView
from src.apps.marketplace.infraestructure.repositories.insights import DjangoInsightsRepository


class InsightsApiView(GenericJwtAPIView):
    
    def get(self, request):
        
        repo =  DjangoInsightsRepository()
        service = GetInsigthsService(repo)
         
        return ApiResponse.success(data=service.execute(),message="Insights Data")