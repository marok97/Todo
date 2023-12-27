from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Task
from starlette import status
from dependencies.db_dependency import get_db
from .auth import get_current_user


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

router = APIRouter(tags=["admin"], prefix="/admin")


@router.get("/tasks")
def get_tasks(user: user_dependency, db: db_dependency):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    tasks = db.query(Task).all()
    return tasks
