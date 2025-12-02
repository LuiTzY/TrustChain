from rest_framework import serializers
from src.apps.marketplace.presentation.products.serializers import ProductSerializer
from src.apps.marketplace.infraestructure.models.payments import PaymentModel


class PaymentSerializer(serializers.ModelSerializer):
    product_info = ProductSerializer(source='product',many=False)
    class Meta:
        model =  PaymentModel
        fields = ('id','tx_hash','buyer_address','seller_address','product_info','amount','status','confirmed_at','created_at')