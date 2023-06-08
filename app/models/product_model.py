from sqlalchemy import Column, String, Float, Integer
from .base_model import BaseModel
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Product(Base, BaseModel):
    __tablename__ = 'products'

    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
