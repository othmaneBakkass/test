from typing import Optional
from sqlmodel import Field, SQLModel, create_engine
from sqlalchemy import Column
from sqlalchemy.dialects import mysql


class Users(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    password: str


class Products(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str = Field(sa_column=Column("description", mysql.TEXT))
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


mysql_url = "mysql+pymysql://root:root@127.0.0.1:3306/ecom"
engine = create_engine(mysql_url, echo=True)

SQLModel.metadata.create_all(engine)


"""
INSERT INTO `ecom`.`products`
(`name`,`description`,`price`,`category`)
VALUES
('tren blaster',
'There can only be ONE King and the King of Pre-workouts has arrived. The officially licensed Noel Deyzel X Godzilla® Pre-Workout is an absolute monster. Packing a massive 40g serving size, this giant delivers city-crushing pumps, razor sharp focus & long-lasting explosive energy. Loaded with 12 ingredients, 5 clinically studied trademarks and a delicious blast of flavor, your new favorite pre-workout is ready for battle.',
'56',
'pre-workout'),
('white powder',
'Creatine is stored in the muscle as creatine phosphate. Those familiar know ATP, cellular energy, is adenosine triphosphate. There’s something special about those phosphates. When they are clipped off the parent molecule, they release a ton of energy. The cell is able to harvest this energy and put it to work. In the muscle, this powers muscle contractions.',
'99',
'creatine'),
('TRT protien',
"RYSE LOADED PROTEIN Combines premium Ingredients with Added Benefits while Simultaneously Bringing Incredible 5 star reviewed flavors to the table! There is no reason you can't have the added benefits of a high quality protein formula without sacrificing taste. Let RYSE LOADED PROTEIN show you the difference!",
'72',
'protien');
"""

"""

INSERT INTO `ecom`.`sizes`
(`size`)
VALUES
("500g"), ("250g"), ("1kg");

"""

"""

INSERT INTO `ecom`.`images`
(`url`)
VALUES
("p1/1.webp"), ("p1/2.webp"), ("p1/3.webp"),
("p2/1.webp"), ("p2/2.webp"), ("p2/3.webp"),
("p3/1.webp"), ("p3/2.webp"), ("p3/3.webp");

"""
