from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.security import OAuth2PasswordBearer
from fastapi_pagination import add_pagination

from app.api.utils.exception_handlers import add_exception_handlers
from app.api.v1.auth import auth_resource
from app.api.v1.habit import habit_resource
from app.api.v1.user import user_resource
from app.core.logger import get_logger
from app.db.init_migration import init_migration

logger = get_logger("app.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_migration()
    yield


app = FastAPI(
    title="Pro Mentor FastAPI",
    version="1.0.0",
    swagger_ui_parameters={"persistAuthorization": True},
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://89.35.124.142:3000",
        "http://89.35.124.142",
        "https://pro-mentor.kz",
        "https://api.pro-mentor.kz",
        "https://www.pro-mentor.kz",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="api/v1/auth/login", scheme_name="bearerAuth", auto_error=False
)

app.include_router(auth_resource.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(
    user_resource.router,
    prefix="/api/v1/users",
    tags=["users"],
    dependencies=[Depends(oauth2_scheme)],
)
app.include_router(
    habit_resource.router,
    prefix="/api/v1/habits",
    tags=["habits"],
    dependencies=[Depends(oauth2_scheme)],
)

add_exception_handlers(app)
add_pagination(app)


def use_route_names_as_operation_ids(app: FastAPI) -> None:
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name


use_route_names_as_operation_ids(app)


@app.get("/health", tags=["health"])
def health():
    return {"status": "OK"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
