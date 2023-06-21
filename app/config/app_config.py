from pydantic import BaseSettings


class Settings(BaseSettings):
    database_password: str
    database_username: str
    database_hostname: str
    database_port: int
    database_name: str

    class Config:
        env_file = ".env"


settings = Settings()
