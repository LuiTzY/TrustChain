
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from src.apps.marketplace.presentation.products.views import BuyProductApiView, ProductViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    path('',include(router.urls), name='product'),
    path('buy/<int:id>/', BuyProductApiView.as_view(), name='buy-product'),
]
