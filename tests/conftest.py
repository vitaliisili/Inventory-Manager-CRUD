from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker
from app.config.app_config import settings
from app.config.database_config import get_db
from sqlalchemy import create_engine
import pytest
from app.models.product_model import Base
from app.models import product_model
from app.main import app

SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@' \
                          f'{settings.database_hostname}:{settings.database_port_test}/{settings.database_name}_test'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


@pytest.fixture
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)


@pytest.fixture
def test_products(client, session):
    products_data = [
        {
            "name": "First Product",
            "price": 10.5,
            "quantity": 2
        },
        {
            "name": "Second Product",
            "price": 11,
            "quantity": 3
        },
        {
            "name": "Third Product",
            "price": 4.3,
            "quantity": 2
        },
    ]
    session.add_all(list(map(lambda prod: product_model.Product(**prod), products_data)))
    session.commit()
    return session.query(product_model.Product).all()
