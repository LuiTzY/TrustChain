from django.urls import path,include
from src.apps.marketplace.presentation.payments.views import PaymentApiView

urlpatterns = [
    path('pays/', PaymentApiView.as_view(), name='pays' )
]
