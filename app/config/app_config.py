from pathlib import Path
from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()
# env_location = Path("./.env").resolve()


class Settings(BaseSettings):
    database_password: str
    database_username: str
    database_hostname: str
    database_port: str
    database_name: str

    class Config:
        env_file = '.env'


settings = Settings()
