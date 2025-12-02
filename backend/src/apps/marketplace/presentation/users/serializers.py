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
    id = serializers.IntegerField(read_only=True)
    password =  serializers.CharField(write_only=True)
    wallet_address= serializers.CharField(required=False)
    created_at = serializers.DateField(read_only=True)
    updated_at = serializers.DateField(read_only=True)
    
    class Meta:
        model =  UserModel
        fields = ('id','first_name','last_name','username','email','password','wallet_address','created_at','updated_at')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Si existe uns instancia  hacer todos los campos opcionales
        if self.instance is not None:
            for field_name, field in self.fields.items():
                # No modificar campos read_only o write_only especiales
                field.required = False        


#  TODO: Hacer serializador y vista para ver lo que un usuario en especifico esta vendiendo

class UserProductSellerSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True,error_messages={
        "required":"Parametro ID requerido",
        "null": "Este campo no puede ser nulo.",
        "blank": "Este campo no puede estar vacio."
    } )
    
class UserProductTypeListSerializerOptions(serializers.Serializer):
    """
        Serializador que se encargara de validar el parametro para el listado
        de los productos comprados del usuario
    """
        
    list_type = serializers.ChoiceField(choices=['seller','buyer'],
    error_messages={
            "required": "Parametro 'list_type' es obligatorio.",
            "invalid_choice": "Valor incorrecto. Solo se permiten 'seller' o 'buyer'.",
            "null": "Este campo no puede ser nulo.",
            "blank": "Este campo no puede estar vacio."
        })
   