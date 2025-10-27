from abc import ABC, abstractmethod


#TODO: MIGRAR las las interfaces a un directorio de interfaces y el product, cambiarlo a IProduct

class BaseObjectRepositoryInterface(ABC):
      
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
    
   

class IProductRepositoryInterface(BaseObjectRepositoryInterface):
    """
        Interfaz que define las operaciones a seguir para todo repositorio del producto deba
        deba de implementar
    """
    @abstractmethod
    def update_status(self, item_id: int, status: str):
        pass

class IUserRepository(BaseObjectRepositoryInterface):
    
    
    @abstractmethod
    def get_by_wallet(self, wallet_address: str):
        pass
    


class IPaymentRepository(BaseObjectRepositoryInterface):
    pass 
    
class IWeb3ProductRepositroy(ABC):
    
    @abstractmethod
    def load_abi(self):
        pass
    
    @abstractmethod
    def create(self, entity):
        pass
    
    
    @abstractmethod
    def buy(self, product_id):
        pass
    
    @abstractmethod
    def load_contract(self):
        pass

class IWeb3UserRepository(ABC):
    
    @abstractmethod
    def get_available_wallet(self):
        pass
    
    @abstractmethod
    def get_wallet_balance(self, wallet):
        pass
    
