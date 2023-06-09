from fastapi import FastAPI

from fastapi.staticfiles import StaticFiles

from api.pages.router import pages_router
from api.products.router import products_router


app = FastAPI()
app.mount("/static", StaticFiles(directory="./resources"), name="static")

app.include_router(pages_router)
app.include_router(products_router)
