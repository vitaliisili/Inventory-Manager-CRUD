from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controller import protuct_controller

app = FastAPI()
app.include_router(protuct_controller.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)

# origins = [
#     "http://localhost:3000",
#     "http://localhost:8000",
#     "http://vitaliisili.com:3000",
#     "https://vitaliisili.com:3000",
#     "https://vitaliisili.com",
#     "http://vitaliisili.com",
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

