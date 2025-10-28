from django.db import models
from src.apps.marketplace.infraestructure.models.product import ProductModel
from src.apps.marketplace.infraestructure.models.user import UserModel



class PaymentModel(models.Model):
    tx_hash = models.CharField(max_length=66, unique=True) #hash de la transaccion que se realizo
    buyer_address = models.CharField(max_length=255) #direcciones hash
    seller_address = models.CharField(max_length=255)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=18, decimal_places=8)
    status = models.CharField(max_length=20, default='pending')  # estatus de la transaccion
    confirmed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tx {self.tx_hash[:10]}... ({self.status})"
    
    class Meta:
        app_label = "payments"
        verbose_name = "Payment"
        verbose_name_plural = "Payments"