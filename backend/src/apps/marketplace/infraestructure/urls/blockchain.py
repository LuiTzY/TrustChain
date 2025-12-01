from django.urls import path
from src.apps.marketplace.presentation.blockchain.views import BlockchainInfoApiView

urlpatterns = [
    path('blockchain-info/', BlockchainInfoApiView.as_view(), name='blockhain-detail')
]
