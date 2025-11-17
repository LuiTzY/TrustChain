from rest_framework import serializers
from src.apps.marketplace.presentation.users.serializers import UserSerializer

from src.apps.marketplace.infraestructure.models.product import ProductModel

class ProductSerializer(serializers.ModelSerializer):
    user_seller =  UserSerializer(source='seller',read_only=True)
    user_buyer = UserSerializer(source='buyer',read_only=True)
    blockchain_id =  serializers.IntegerField(read_only=True)
    class Meta:
        model =  ProductModel
        fields = ('id','blockchain_id','name','description','price','user_seller','user_buyer')