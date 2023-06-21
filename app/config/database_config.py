from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .app_config import settings
from ..models import product_model

SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:test@' \
                          f'{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


product_model.Base.metadata.create_all(bind=engine)
