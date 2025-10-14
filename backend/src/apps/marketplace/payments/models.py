from django.db import models

from backend.src.products.models import Product
from backend.src.users.models import User

class PaymentTransaction(models.Model):
    tx_hash = models.CharField(max_length=120, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='tx_sender', on_delete=models.SET_NULL, null=True)
    receiver = models.ForeignKey(User, related_name='tx_receiver', on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=18, decimal_places=8)
    event_type = models.CharField(max_length=50)  # 'ItemListed', 'ItemPurchased' o 'ItemCanceled'
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_type} - {self.tx_hash[:10]}..."
