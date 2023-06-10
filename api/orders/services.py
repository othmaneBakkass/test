from sqlmodel import Session
from typing import List
from pydantic import BaseModel
from ..db.models import Orders, Order_to_product
from ..db.engine import engine


class OrderInfo(BaseModel):
    address: str
    email: str
    first_name: str
    last_name: str
    order_total: int
    user_id: int | None = None


class ProductsInfoForOrders(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    size: str


def add_order(order: OrderInfo, products: List[ProductsInfoForOrders]):
    try:
        # create order
        order = Orders(
            address=order.address,
            email=order.email,
            first_name=order.first_name,
            last_name=order.last_name,
            order_total=order.order_total,
            user_id=order.user_id,
        )
        with Session(engine) as session:
            session.add(order)
            session.commit()
            # link products info to orders
            order_to_product_list = []
            for product in products:
                order_to_product_list.append(
                    Order_to_product(
                        product_id=product.product_id,
                        product_name=product.product_name,
                        quantity=product.quantity,
                        size=product.size,
                        order_id=order.id,
                    )
                )
            session.add_all(order_to_product_list)
            session.commit()
            return (True, order.id)
    except:
        print("🚀 ~ add_order ~ error")
        return (False, "database error")
