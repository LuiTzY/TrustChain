
from dataclasses import dataclass
from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from ..exceptions import *

#NOTA: Los metodos con el decorador field_validator se ejecutaran al instanciar la clase

class User(BaseModel):
    
    id: Optional[int] = None
    first_name: str
    last_name: str
    email: Optional[str]
    username: str
    password: str
    wallet_address: str
    
    
class AuthCredentials(BaseModel):
    access_token:str
    refresh_token:str
    
    #Metodos de validacion como email, password, username etc