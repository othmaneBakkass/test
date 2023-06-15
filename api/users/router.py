import datetime

from fastapi import APIRouter, HTTPException, Response

from .services import (
    add_user,
    AddUserParams,
    check_user_email,
    check_user_email_and_password,
)


users_router = APIRouter(prefix="/api/users", tags=["users"])


@users_router.get("/email/{email}")
def check_user_email_controller(email: str):
    res = check_user_email(email)

    if res[0]:
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})


@users_router.get("/credentials/basic")
def check_user_email_and_password_controller(
    email: str, password: str, response: Response
):
    res = check_user_email_and_password(email, password)

    if res[0]:
        if len(res[1]) > 0:
            response.set_cookie(
                key="auth_id",
                value=str(res[1][0]),
                expires=datetime.datetime(2024, 12, 1, tzinfo=datetime.timezone.utc),
            )
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})


@users_router.post("")
def add_user_controller(userInfo: AddUserParams, response: Response):
    res = add_user(userInfo)

    if res[0]:
        response.set_cookie(
            key="auth_id",
            value=str(res[1]),
            expires=datetime.datetime(2024, 12, 1, tzinfo=datetime.timezone.utc),
        )
        return {"ok": True, "data": res[1]}
    raise HTTPException(status_code=500, detail={"ok": False, "reason": res[1]})
