from rest_framework import serializers
from src.apps.marketplace.infraestructure.models import ProductModel

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =  ProductModel
        fields = '__all__'