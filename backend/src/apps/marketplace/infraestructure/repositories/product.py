from src.apps.marketplace.infraestructure.models.product import ProductModel
from src.apps.marketplace.infraestructure.models.user import UserModel
from src.apps.marketplace.domain.interfaces import (IProductRepositoryInterface)

from src.apps.marketplace.domain.entities.product import Product
from src.apps.marketplace.domain.exceptions.product import (ProductNotFound,ProductBlockhainDuplicated)
from django.db.utils import IntegrityError 

class DjangoProductRepository(IProductRepositoryInterface):
    """ Implementacion concrecta del repositiorio utilziando el ORM de django para el CRUD de los productos"""
    
    def save(self, entity:Product) -> ProductModel:
        
        print(entity.price)
        #Aqui obtenemos el usuario con el wallet, para pasarselo
        user_seller = UserModel.objects.get(wallet_address=entity.seller_wallet)
        
        try:
            product = ProductModel.objects.create(
            blockchain_id = entity.id,
            name = entity.name,
            price = entity.price,
            description = entity.description,
            seller = user_seller,
            status = entity.status
        )   
            print("Creamos el producto")
            return product
        except IntegrityError:
            raise ProductBlockhainDuplicated()
        except Exception as e:
            print(f"No pudimos crear el producto {e} \n")
            
    def find_by_id(self, item_id: int):
        try:
            return ProductModel.objects.get(id=item_id)
        except ProductModel.DoesNotExist:
            raise ProductNotFound(f"Item con ID {item_id} no encontrado.")

    def find_by_blockchain_id(self, id: int):
        try:
            return ProductModel.objects.get(blockchain_id=id)
        except ProductModel.DoesNotExist:
            raise ProductNotFound(f"Item con Blockchain ID {id} no encontrado.")


    def list_all(self) -> list[ProductModel] :
        return ProductModel.objects.all()

    def update_status(self, item_id: int, new_status: str) -> ProductModel:
        item = self.find_by_id(item_id)
        print("Se Intentara actualizar el estatus del producto")
        try:
            item.status = new_status
            item.save()
        except Exception as e:
            return f"Ha ocurrido este error al actualizar el producto {e}"
        return item

    def get_count(self)-> int:
        return ProductModel.objects.count()
    
    def get_seller_count(self)-> int:
        return ProductModel.objects.filter(status="selled").count()