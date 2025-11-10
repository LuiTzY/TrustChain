from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView,TokenBlacklistView
from src.apps.marketplace.presentation.users.views import UserViewSet,UserBalanceView
from core.config.prefix import API_AUTH_PREFIX, API_BASE_PREFIX, API_USER_PREFIX

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('',include(router.urls)),
    path(f'{API_AUTH_PREFIX}/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{API_AUTH_PREFIX}/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(f'{API_AUTH_PREFIX}/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path(f'{API_AUTH_PREFIX}/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path(f'{API_USER_PREFIX}/balance/', UserBalanceView.as_view(), name='balance'),
]
