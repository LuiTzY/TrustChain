from dataclasses import dataclass
from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from .exceptions import *

#NOTA: Los metodos con el decorador field_validator se ejecutaran al instanciar la clase

class Product(BaseModel):
    """ Entidad del producto: Hace la representacion de un producto dentro del MarketPlace de la blockchain"""
    id: int
    name: str
    price: float
    description: Optional[str] = None
    seller_wallet: str
    status: Literal['listed','sold','cancelled'] = "listed"
    
    
    @field_validator("seller_wallet")
    @classmethod
    def validar_wallet(cls, v):
        """Valida el wallet del usuario"""
        print(f"Se supone que se debe de validar {v}")
        if not v.startswith("0x"):
            raise ProductInvalidSellerWalletAddress()
        return v
    
    @field_validator("price")
    @classmethod
    def validate_price(cls,v):
        if v <= 0:
            raise ProductInvalidPrice()
        return v
        
    def mark_as_sold(self) -> None:
        """Marca el producto como vendido."""
        self.status = "sold"

    def cancel(self) -> None:
        """Cancela el producto, si no ha sido vendido."""
        if self.status == "sold":
            raise ValueError("No se puede cancelar un producto vendido.")
        self.status = "cancelled"
        

class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    wallet_address: str
    
    
    
    #Metodos de validacion como email etc