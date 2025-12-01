from django.urls import path
from src.apps.marketplace.presentation.dashboard.views import *

urlpatterns = [
    path('insights', InsightsApiView.as_view(), name='insights')
]
