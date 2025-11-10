from rest_framework import serializers
from src.apps.marketplace.infraestructure.models.user import UserModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserTokenObtainSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] =  user.last_name
        token['username'] = user.username
        token['wallet_address'] = user.wallet_address

        return token
    
    
class UserSerializer(serializers.ModelSerializer):
    # email =  serializers.EmailField(required=False)
    password =  serializers.CharField(write_only=True)
    wallet_address= serializers.CharField(required=False)
    created_at = serializers.DateField(read_only=True)
    updated_at = serializers.DateField(read_only=True)
    
    class Meta:
        model =  UserModel
        fields = ('first_name','last_name','username','email','password','wallet_address','created_at','updated_at')
        
