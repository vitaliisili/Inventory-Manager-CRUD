from typing import List, Optional
from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import desc
from sqlalchemy.orm import Session
from sqlalchemy.sql import functions
from ..config.database_config import get_db
from ..schemas import product_schemas
from ..models import product_model

router = APIRouter(tags=['Products'])


@router.get("/api/products", response_model=List[product_schemas.Product])
async def get_products(page: int = 1, size: int = 0, search: Optional[str] = "", db: Session = Depends(get_db)):
    products = db.query(product_model.Product) \
        .order_by(desc(product_model.Product.id)) \
        .filter(product_model.Product.name.contains(search)) \
        .limit(size if size > 0 else None) \
        .offset((page - 1) * size)\
        .all()
    return products


@router.get("/api/products/total-value", response_model=product_schemas.ProductTotal)
async def get_total_product_value(db: Session = Depends(get_db)):
    total = db.query(functions.sum(product_model.Product.price).label("total_value")).first()
    if total[0] is None:
        return {'total_value': 0}
    return total


@router.get("/api/products/total-items", response_model=product_schemas.ProductTotalItems)
async def get_total_product_value(db: Session = Depends(get_db)):
    total = db.query(functions.sum(product_model.Product.quantity).label("total_items")).first()
    if total[0] is None:
        return {'total_items': 0}
    return total


@router.get("/api/products/{id}", response_model=product_schemas.Product)
async def get_product_by_id(id: int, db: Session = Depends(get_db)):
    product = db.query(product_model.Product).filter(product_model.Product.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"product with id:{id} not found")
    return product


@router.post("/api/products", status_code=status.HTTP_201_CREATED, response_model=product_schemas.Product)
async def create_product(product: product_schemas.ProductBase, db: Session = Depends(get_db)):
    new_product = product_model.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@router.delete("/api/products/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(id: int, db: Session = Depends(get_db)):
    product_query = db.query(product_model.Product).filter(product_model.Product.id == id)
    product = product_query.first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"product with id: {id} not found")
    product_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/api/products/{id}", response_model=product_schemas.Product)
async def update_product(updated_product: product_schemas.ProductBase, id: int, db: Session = Depends(get_db)):
    product_query = db.query(product_model.Product).filter(product_model.Product.id == id)
    if not product_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"product with id:{id} not found")
    product_query.update(updated_product.dict(), synchronize_session=False)
    db.commit()
    return product_query.first()
