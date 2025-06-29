from fastapi import APIRouter, Depends, Response, Request, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.api.v1.auth import auth_service
from app.core.config import settings
from app.core.logger import get_logger
from app.models.session import Session as DBSessionModel
from app.schemas.auth import TokenModel
from app.schemas.user import UserCreate

router = APIRouter()

logger = get_logger(__name__)


def set_session_cookie(response: Response, token: str) -> None:
    secure = settings.is_production
    same_site = "strict" if settings.is_production else "lax"
    domain = settings.cookie_domain

    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        secure=secure,
        samesite=same_site,
        max_age=settings.SESSION_DURATION_DAYS * 24 * 60 * 60,
        domain=domain,
    )
    logger.debug(
        f"Set session cookie: "
        f"domain={domain}, "
        f"secure={secure}, "
        f"samesite={same_site}"
    )


@router.post(
    "/register", response_model=TokenModel, status_code=status.HTTP_201_CREATED
)
def register(
    response: Response, user_in: UserCreate, db: Session = Depends(get_db)
) -> TokenModel:
    db_session: DBSessionModel = auth_service.register_user(db=db, user_in=user_in)
    token = str(db_session.token)

    set_session_cookie(response, token)
    return TokenModel(access_token=token, token_type="bearer")


@router.post("/login", response_model=TokenModel)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> TokenModel:
    db_session: DBSessionModel = auth_service.login_user(
        db=db, username=form_data.username, password=form_data.password
    )

    token = str(db_session.token)
    set_session_cookie(response, token)
    return TokenModel(access_token=token, token_type="bearer")


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(
    response: Response, request: Request, db: Session = Depends(get_db)
) -> JSONResponse:
    session_token = request.cookies.get("session_token")

    if session_token:
        auth_service.logout_user(db=db, session_id=session_token)

    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie("session_token")

    return response
