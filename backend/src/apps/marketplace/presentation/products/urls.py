
from django.urls import path
from rest_framework.routers import DefaultRouter

from src.apps.marketplace.presentation.products.views import ProductViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='products')

urlpatterns = router.urls
