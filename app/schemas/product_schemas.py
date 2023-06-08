from pydantic import BaseModel
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    price: float
    quantity: int


class Product(ProductBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class ProductTotal(BaseModel):
    total_value: float

    class Config:
        orm_mode = True


class ProductTotalItems(BaseModel):
    total_items: int

    class Config:
        orm_mode = True
