from typing import Optional
from pydantic import BaseModel


class Payment(BaseModel):
    tx_hash: str
    buyer_address: str
    seller_address: str
    product: int
    amount: float
    status: str
    confirmed_at: Optional[str] = None
