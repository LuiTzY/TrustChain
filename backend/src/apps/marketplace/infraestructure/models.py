from django.db import models

from src.apps.users.models import User


class ProductModel(models.Model):
    STATUS_CHOICES = [
        ('listed', 'Listed'),
        ('sold', 'Sold'),
        ('cancelled', 'Cancelled'),
    ]
    #id generado por el smart contract
    blockchain_id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=120)
    description = models.TextField(null=True,blank=True, verbose_name="Descripcion del producto")
    price = models.DecimalField(max_digits=38, decimal_places=0)  # en ETH o token simulado
    image_url = models.URLField(blank=True, null=True)
    seller = models.ForeignKey(User, related_name='items_selling', on_delete=models.CASCADE,null=True, blank=True) #quitar los null
    buyer = models.ForeignKey(User, related_name='items_bought', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='listed')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = "products"
    def __str__(self):
        return f"{self.name} - {self.status}"