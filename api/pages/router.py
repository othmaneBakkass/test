from typing import Annotated
import json
import urllib.parse
from fastapi import APIRouter, Request, Cookie
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from ..products.services import (
    get_all_products,
    get_products_by_category,
    get_product_by_id,
    get_many_products_by_ids,
)

templates = Jinja2Templates(directory="pages")
pages_router = APIRouter(tags=["pages"])


@pages_router.get("/cbum", response_class=HTMLResponse)
def home_page(request: Request):
    data = get_all_products()
    if data[0]:
        return templates.TemplateResponse(
            "cbum.html", {"request": request, "products": data[1]}
        )


@pages_router.get("/reda", response_class=HTMLResponse)
def home_page(request: Request):
    data = get_all_products()
    if data[0] == True:
        return templates.TemplateResponse(
            "reda.html", {"request": request, "products": data[1]}
        )


@pages_router.get("/products/category/{category}", response_class=HTMLResponse)
def home_page(request: Request, category: str):
    # data = get_products_by_category(category)
    data = get_all_products()
    print(category)
    if data[0] == True:
        return templates.TemplateResponse(
            "reda.category.html",
            {"request": request, "products": data[1], "category": category},
        )


@pages_router.get("/products/{id}", response_class=HTMLResponse)
def home_page(request: Request, id: int):
    data = get_product_by_id(id)
    if data[0] == True:
        return templates.TemplateResponse(
            "cbum.products.html", {"request": request, "product": data[1]}
        )


@pages_router.get("/cart", response_class=HTMLResponse)
def home_page(
    request: Request,
    cart: Annotated[str | None, Cookie()] = None,
):
    if cart:
        cartInfo = json.loads(urllib.parse.unquote(cart))
        products = get_many_products_by_ids(cartInfo["products"])

        return templates.TemplateResponse(
            "cbum.cart.html",
            {
                "request": request,
                "products": products[1],
                "total": cartInfo["total"],
                "size_to_product_id": cartInfo["products"],
            },
        )

    return templates.TemplateResponse(
        "cbum.cart.html",
        {
            "request": request,
        },
    )


@pages_router.get("/checkout", response_class=HTMLResponse)
def home_page(request: Request):
    return templates.TemplateResponse("reda.checkout.html", {"request": request})


@pages_router.get("/login", response_class=HTMLResponse)
def home_page(request: Request):
    return templates.TemplateResponse("cbum.html", {"request": request, "data": "gay"})


@pages_router.get("/signup", response_class=HTMLResponse)
def home_page(request: Request):
    return templates.TemplateResponse("cbum.html", {"request": request, "data": "gay"})
