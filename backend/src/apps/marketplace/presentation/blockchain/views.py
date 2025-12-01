from src.apps.common.response import ApiResponse
from src.apps.marketplace.infraestructure.generics import GenericJwtAPIView
from core.environments.variables import HARDHAT_MARKETPLACE_ADDRESS, HARDHAT_SERVER_URL

class BlockchainInfoApiView(GenericJwtAPIView):
    
    def get(self,request):
        block_info = {
            "server_url":HARDHAT_SERVER_URL,
            "marketplace_address":HARDHAT_MARKETPLACE_ADDRESS
        }
        return ApiResponse.success(data=block_info, message="Informacion del Nodo de blockchain")