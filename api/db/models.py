from typing import Optional
from sqlmodel import Field, SQLModel

class Users(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    password: str

class Products(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    price: int
    category: str

class Sizes(SQLModel, table=True):
     id: Optional[int] = Field(default=None, primary_key=True)
     size: str
    
class Images(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    url: str

class Orders(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    first_name: str
    last_name: str
    address: str
    order_total: int
    user_id: int | None = Field(default=None, foreign_key="users.id")

class Order_to_product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int | None = Field(default=None, foreign_key="products.id")
    order_id: int | None = Field(default=None, foreign_key="orders.id")
    product_name: str
    quantity: int
    size: str

class Product_to_attributs(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    size_id: int | None = Field(default=None, foreign_key="sizes.id")
    img_id: int | None = Field(default=None, foreign_key="images.id")
    product_id: int | None = Field(default=None, foreign_key="products.id")