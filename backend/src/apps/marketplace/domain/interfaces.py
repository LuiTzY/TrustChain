from abc import ABC, abstractmethod

#TODO: MIGRAR las las interfaces a un directorio de interfaces y el product, cambiarlo a IProduct
class ProductRepositoryInterface(ABC):
    """
        Interfaz que define las operaciones a seguir para todo repositorio del producto deba
        deba de implementar
    """
    
    @abstractmethod
    def save(self, entity):
        """Metodo para guardar el objeto"""
        pass
    
    @abstractmethod
    def find_by_id(self, item_id: int):
        pass
    
    @abstractmethod
    def list_all(self):
        pass
    
    @abstractmethod
    def update_status(self, item_id: int, status: str):
        pass


class IUserRepository(ABC):
    @abstractmethod
    def get_by_wallet(self, wallet_address: str):
        pass
    
    
class IWeb3ProductRepositroy(ABC):
    
    @abstractmethod
    def create(self, entity):
        pass
    
    #Otros metodos

    