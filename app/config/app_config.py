from pathlib import Path
from pydantic import BaseSettings

env_location = Path("./.env").resolve()


class Settings(BaseSettings):
    database_password: str
    database_username: str
    database_hostname: str
    database_port_test: str
    database_port: str
    database_name: str

    class Config:
        env_file = env_location


settings = Settings()
