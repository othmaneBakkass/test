from typing import List
from fastapi import APIRouter, HTTPException

from .services import (
    add_order,
    OrderInfo,
    ProductsInfoForOrders,
    get_order_and_order_items_by_user_id,
)


orders_router = APIRouter(prefix="/api/orders", tags=["orders"])


@orders_router.post("")
def add_order_controller(order: OrderInfo, products: List[ProductsInfoForOrders]):
    res = add_order(order, products)

    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})


@orders_router.get("/{id}/details")
def get_order_and_details_controller(id: int):
    res = get_order_and_order_items_by_user_id(id)
    return res
