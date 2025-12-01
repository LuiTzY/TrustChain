from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from .config.prefix import API_BASE_PREFIX, API_MARKETPLACE_PREFIX

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_BASE_PREFIX}/{API_MARKETPLACE_PREFIX}/', include('src.apps.marketplace.infraestructure.urls.products')),
    path(f'{API_BASE_PREFIX}/{API_MARKETPLACE_PREFIX}/', include('src.apps.marketplace.infraestructure.urls.payments')),
    path(f'{API_BASE_PREFIX}/', include('src.apps.marketplace.infraestructure.urls.users')),
    path(f'{API_BASE_PREFIX}/{API_MARKETPLACE_PREFIX}/dashboard/', include('src.apps.marketplace.infraestructure.urls.dashboard')),
    path(f'{API_BASE_PREFIX}/{API_MARKETPLACE_PREFIX}/blockchain/', include('src.apps.marketplace.infraestructure.urls.blockchain'))

]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)