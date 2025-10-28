from rest_framework import serializers
from src.apps.marketplace.infraestructure.models.payments import PaymentModel


class PaymentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  PaymentModel
        fields = '__all__'