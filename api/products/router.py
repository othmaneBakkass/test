from fastapi import APIRouter, HTTPException
from .services import (
    get_all_products,
    get_product_by_id,
    get_products_by_category,
)


products_router = APIRouter(prefix="/api/products", tags=["products"])


@products_router.get("")
def get_all_products_controller():
    res = get_all_products()

    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})


@products_router.get("/{id}")
def get_product_by_id_controller(id: int):
    res = get_product_by_id(id)
    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})


@products_router.get("/category/{category}")
def get_products_by_category_controller(category: str):
    res = get_products_by_category(category)

    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})
