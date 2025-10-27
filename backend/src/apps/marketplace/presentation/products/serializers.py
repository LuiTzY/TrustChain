from rest_framework import serializers

from src.apps.marketplace.infraestructure.models.product import ProductModel

class ProductSerializer(serializers.ModelSerializer):
    blockchain_id =  serializers.IntegerField(read_only=True)
    class Meta:
        model =  ProductModel
        fields = ('id','blockchain_id','name','description','price')