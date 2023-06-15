from sqlmodel import Session, select
from pydantic import BaseModel
from ..db.models import Users
from ..db.engine import engine


class AddUserParams(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str


def add_user(userInfo: AddUserParams):
    try:
        with Session(engine) as session:
            user = Users(
                email=userInfo.email,
                first_name=userInfo.first_name,
                last_name=userInfo.last_name,
                password=userInfo.password,
            )

            session.add(user)
            session.commit()
            return (True, user.id)

    except:
        print("🚀 ~ add_user ~ error")
        return (False, "database error")


def check_user_email(email: str):
    try:
        with Session(engine) as session:
            user = session.exec(
                select(Users.id).where(Users.email == email).limit(1)
            ).all()

            return (True, user)

    except:
        print("🚀 ~ add_user ~ error")
        return (False, "database error")


def check_user_email_and_password(email: str, password: str):
    try:
        with Session(engine) as session:
            user = session.exec(
                select(Users.id)
                .where(Users.email == email)
                .where(Users.password == password)
                .limit(1)
            ).all()

            return (True, user)

    except:
        print("🚀 ~ add_user ~ error")
        return (False, "database error")
