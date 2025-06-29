from typing import Optional

from fastapi import Depends, HTTPException, status, Cookie, Header
from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.db.session import SessionLocal
from app.repositories.session import get_user_id_from_session
from app.repositories.user import get_user as get_user_repo
from app.schemas.user import UserOut

logger = get_logger(__name__)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_token_from_request(
    session_token: Optional[str] = Cookie(None, include_in_schema=False),
    authorization: Optional[str] = Header(None, include_in_schema=False),
) -> Optional[str]:
    token = None
    if session_token:
        token = session_token
    elif authorization:
        scheme, _, token_value = authorization.partition(" ")
        if scheme.lower() == "bearer" and token_value:
            token = token_value
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Authentication header format",
                headers={"WWW-Authenticate": "Bearer"},
            )
    return token


def get_current_user(
    db: Session = Depends(get_db),
    token: Optional[str] = Depends(get_token_from_request),
) -> UserOut:
    if token is None:
        logger.warning("Attempted to get current user without a token.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated (no token provided)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = get_user_id_from_session(db, token=token)

    if user_id is None:
        logger.warning(f"Invalid or expired session token provided: {token[:10]}...")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_user_repo(db, user_id=user_id)

    if user is None:
        logger.error(f"User ID {user_id} from session token {token[:10]}... not found.")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User associated with session not found",
        )

    logger.debug(f"Authenticated user {user.id} via session.")
    return user
