from sqlalchemy import Column, Integer, text
from sqlalchemy.dialects.postgresql import TIMESTAMP


class BaseModel:
    id = Column(Integer, primary_key=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
