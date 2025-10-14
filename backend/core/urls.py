from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)
from django.conf import settings
from django.conf.urls.static import static
from .config.prefix import API_BASE_PREFIX

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_BASE_PREFIX}/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{API_BASE_PREFIX}/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(f'{API_BASE_PREFIX}/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path(f'{API_BASE_PREFIX}/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path(f'{API_BASE_PREFIX}/', include('src.apps.marketplace.presentation.products.urls'))
]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)