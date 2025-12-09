from src.apps.marketplace.infraestructure.repositories.web3 import DjangoWeb3Repository
from src.apps.common.response import ApiResponse
from src.apps.marketplace.infraestructure.generics import GenericJwtAPIView
from core.environments.variables import ABI, HARDHAT_MARKETPLACE_ADDRESS, HARDHAT_SERVER_URL
from rest_framework.permissions import AllowAny

class BlockchainInfoApiView(GenericJwtAPIView):
    authentication_clasess = []
    permission_clases = [AllowAny]
    def get(self,request):
        
        repo = DjangoWeb3Repository()
        block_info = {
            "abi":ABI,
            "server_url":HARDHAT_SERVER_URL,
            "marketplace_address":HARDHAT_MARKETPLACE_ADDRESS,
            "chain_id":repo.get_chain_id()
        }
        return ApiResponse.success(data=block_info, message="Informacion del Nodo de blockchain")