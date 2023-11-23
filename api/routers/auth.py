from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from dependencies.db_dependency import get_db
from schemas import CreateUserRequest, Token
from sqlalchemy.orm import Session
from models import User
from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError

db_dependency = Annotated[Session, Depends(get_db)]

router = APIRouter(prefix="/auth", tags=["auth"])

# Created with openssl rand -hex 32
SECRET_KEY = "53d14e4de7d449103bfb5d7dd4e7abba0f4c6d42374224824bd6b8edf834a09c"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


def authenticate_user(username: str, password: str, db_session):
    user = db_session.query(User).filter(User.username == username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    if not bcrypt_context.verify(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong password"
        )

    return user


def create_access_token(
    username: str, user_id: int, user_role: str, expires_delta: timedelta
):
    encode = {"sub": username, "id": user_id, "role": user_role}
    expire = datetime.utcnow() + expires_delta
    encode.update({"exp": expire})

    return jwt.encode(encode, SECRET_KEY, ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        user_role: int = payload.get("role")

        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user",
            )

        return {"username": username, "id": user_id, "role": user_role}

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user"
        )


# Function to verify token
def verify_token(token: Annotated[str, Depends(oauth2_bearer)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return payload


# Function to refresh access token
@router.post("/token/refresh", response_model=dict)
def refresh_access_token(
    current_user: dict = Depends(verify_token),
):
    # Create a new access token with an extended expiration time
    new_access_token = create_access_token(
        current_user.get("sub"),
        current_user.get("id"),
        current_user.get("role"),
        timedelta(minutes=20),
    )

    return {"access_token": new_access_token, "token_type": "bearer"}


@router.post("/create_user", status_code=status.HTTP_201_CREATED)
def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = User(
        email=create_user_request.email,
        username=create_user_request.username,
        first_name=create_user_request.first_name,
        last_name=create_user_request.last_name,
        role=create_user_request.role,
        hashed_password=bcrypt_context.hash(create_user_request.password),
        is_active=True,
    )

    db.add(create_user_model)
    db.commit()


@router.get("/get_users")
def get_users(db: db_dependency):
    return db.query(User).all()


@router.post("/token", response_model=Token)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
):
    print(form_data)
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        return "Failed auth"

    token = create_access_token(
        user.username, user.id, user.role, timedelta(minutes=20)
    )
    return {"access_token": token, "token_type": "bearer"}
