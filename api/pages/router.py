import json
import datetime
import urllib.parse
from typing import Annotated
from fastapi import APIRouter, Request, Cookie, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from ..products.services import (
    get_all_products,
    get_products_by_category,
    get_product_by_id,
    get_many_products_by_ids,
)
from ..orders.services import get_order_and_order_items_by_user_id


templates = Jinja2Templates(directory="pages")
pages_router = APIRouter(tags=["pages"])


@pages_router.get("/cbum", response_class=HTMLResponse)
def home_page(
    request: Request, auth_id: Annotated[str | None, Cookie()] = "not_logged_in"
):
    data = get_all_products()
    print("auth_id == " + auth_id)
    print(type(auth_id))
    print(type("auth_id"))

    if data[0]:
        return templates.TemplateResponse(
            "cbum.html", {"request": request, "products": data[1], "auth": auth_id}
        )


@pages_router.get("/reda", response_class=HTMLResponse)
def home_page(
    request: Request, auth_id: Annotated[str | None, Cookie()] = "not_logged_in"
):
    data = get_all_products()
    if data[0] == True:
        return templates.TemplateResponse(
            "reda.html", {"request": request, "products": data[1], "auth": auth_id}
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
def home_page(
    request: Request,
    id: int,
    auth_id: Annotated[str | None, Cookie()] = "not_logged_in",
):
    data = get_product_by_id(id)
    if data[0] == True:
        return templates.TemplateResponse(
            "reda.products.html",
            {"request": request, "product": data[1], "auth": auth_id},
        )


@pages_router.get("/cart", response_class=HTMLResponse)
def home_page(
    request: Request,
    cart: Annotated[str | None, Cookie()] = None,
    auth_id: Annotated[str | None, Cookie()] = "not_logged_in",
):
    if cart:
        cartInfo = json.loads(urllib.parse.unquote(cart))
        products = get_many_products_by_ids(cartInfo["products"])

        return templates.TemplateResponse(
            "reda.cart.html",
            {
                "request": request,
                "products": products[1],
                "total": cartInfo["total"],
                "size_to_product_id": cartInfo["products"],
                "auth": auth_id,
            },
        )

    return templates.TemplateResponse(
        "reda.cart.html",
        {
            "request": request,
        },
    )


@pages_router.get("/checkout", response_class=HTMLResponse)
def home_page(
    request: Request, auth_id: Annotated[str | None, Cookie()] = "not_logged_in"
):
    return templates.TemplateResponse(
        "reda.checkout.html", {"request": request, "auth": auth_id}
    )


@pages_router.get("/login", response_class=HTMLResponse)
def home_page(request: Request):
    return templates.TemplateResponse("reda.login.html", {"request": request})


@pages_router.get("/logout")
def home_page():
    res = RedirectResponse(url="http://localhost:8000/reda")
    # set auth
    res.set_cookie(
        key="auth_id",
        value="not_logged_in",
        expires=datetime.datetime(2024, 12, 1, tzinfo=datetime.timezone.utc),
        path="/",
    )
    # set cart to be empty
    res.delete_cookie(key="cart")
    return res


@pages_router.get("/signup", response_class=HTMLResponse)
def home_page(
    request: Request,
    auth_id: Annotated[str | None, Cookie()] = "not_logged_in",
):
    if auth_id:
        return templates.TemplateResponse(
            "reda.signup.html", {"request": request, "auth": auth_id}
        )


@pages_router.get("/profile", response_class=HTMLResponse)
def home_page(
    request: Request, auth_id: Annotated[str | None, Cookie()] = "not_logged_in"
):
    if auth_id != "not_logged_in" and auth_id != None:
        res = get_order_and_order_items_by_user_id(auth_id)
        if res[0]:
            return templates.TemplateResponse(
                "reda.profile.html", {"request": request, "data": res[1]}
            )
    return {"please": "login"}
