from sqlmodel import Session, select
from typing import List
from pydantic import BaseModel
from ..db.models import Orders, Order_to_product, Images, Product_to_attributs
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


def get_order_and_order_items_by_user_id(user_id):
    with Session(engine) as session:
        orders = session.exec(select(Orders).where(Orders.user_id == user_id)).all()
        data = []

        for order in orders:
            items = session.exec(
                select(Order_to_product).where(order.id == Order_to_product.order_id)
            ).all()

            orderItems = []

            for item in items:
                img_url = session.exec(
                    select(Images.url)
                    .where(Product_to_attributs.product_id == item.product_id)
                    .where(Product_to_attributs.img_id == Images.id)
                    .limit(1)
                ).all()

                orderItems.append(
                    {
                        "product_name": item.product_name,
                        "size": item.size,
                        "quantity": item.quantity,
                        "img_url": img_url[0],
                    }
                )
            data.append(
                {
                    "orderInfo": order,
                    "orderItems": orderItems,
                }
            )

        return (True, data)
