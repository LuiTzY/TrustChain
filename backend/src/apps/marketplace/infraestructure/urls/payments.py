from django.urls import path,include
from src.apps.marketplace.presentation.payments.views import PaymentApiView, UserRecentPaymentsView

urlpatterns = [
    path('pays/', PaymentApiView.as_view(), name='pays' ),
    path('recent-pays/',UserRecentPaymentsView.as_view(), name='recent-payments')
]
