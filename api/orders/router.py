from typing import List
from fastapi import APIRouter, HTTPException

from .services import add_order, OrderInfo, ProductsInfoForOrders


orders_router = APIRouter(prefix="/api/orders", tags=["orders"])


@orders_router.post("")
def add_order_controller(order: OrderInfo, products: List[ProductsInfoForOrders]):
    res = add_order(order, products)

    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})
