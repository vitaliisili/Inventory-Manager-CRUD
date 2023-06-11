from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controller import protuct_controller

app = FastAPI()
app.include_router(protuct_controller.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

