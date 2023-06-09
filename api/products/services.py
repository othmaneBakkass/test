from typing import List, Dict
from sqlmodel import Session, select
from ..db.models import Products, Product_to_attributs, Images, Sizes
from ..db.engine import engine


def get_many_product_info(product_list: List[Products], session: Session):
    data = []

    for product in product_list:
        imgs = session.exec(
            select(Images.url)
            .join(Product_to_attributs)
            .where(Product_to_attributs.product_id == product.id)
        ).all()
        sizes = session.exec(
            select(Sizes.size)
            .join(Product_to_attributs)
            .where(Product_to_attributs.product_id == product.id)
        ).all()
        data.append(
            {
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "category": product.category,
                "sizes": sizes,
                "imgs": imgs,
            }
        )
    return data


def get_product_info(product: Products, session: Session):
    imgs = session.exec(
        select(Images.url)
        .join(Product_to_attributs)
        .where(Product_to_attributs.product_id == product.id)
    ).all()
    sizes = session.exec(
        select(Sizes.size)
        .join(Product_to_attributs)
        .where(Product_to_attributs.product_id == product.id)
    ).all()

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "sizes": sizes,
        "imgs": imgs,
    }


def get_all_products():
    try:
        with Session(engine) as session:
            products = session.exec(select(Products)).all()

            data = get_many_product_info(products, session)

            return (True, data)
    except:
        print("🚀 ~ get_all_products ~ error")
        return (False, "database error")


def get_products_by_category(category: str):
    try:
        with Session(engine) as session:
            products = session.exec(
                select(Products).where(Products.category == category)
            ).all()

            data = get_many_product_info(products, session)

            return (True, data)
    except:
        print("🚀 ~ get_product_by_category ~ error")
        return (False, "database error")


def get_product_categories():
    try:
        with Session(engine) as session:
            categories = session.exec(select(Products.category)).all()

            return (True, categories)
    except:
        print("🚀 ~ get_product_category ~ error")
        return (False, "database error")


def get_product_by_id(id: int):
    try:
        with Session(engine) as session:
            product = session.get(Products, id)

            data = get_product_info(product, session)

            return (True, data)
    except:
        print("🚀 ~ get_product_by_id ~ error")
        return (False, "database error")


def get_many_products_by_ids(product_info: List[Dict[str, int | str]]):
    try:
        with Session(engine) as session:
            list_products = []
            for info in product_info:
                product = session.get(Products, info["id"])
                list_products.append(product)

            data = get_many_product_info(list_products, session)

            return (True, data)
    except:
        print("🚀 ~ get_product_by_id ~ error")
        return (False, "database error")


def get_product_image_by_id():
    return 1
