from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoCreate
from starlette import status
from dependencies.db_dependency import get_db
from .auth import get_current_user


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

router = APIRouter(tags=["todos"])


@router.get("/todos")
def get_todos(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    todos = db.query(Todo).filter(Todo.owner_id == user.get("id")).all()
    return todos


@router.get("/todo/{todo_id}")
def get_todo_by_id(user: user_dependency, db: db_dependency, todo_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    todo_model = (
        db.query(Todo)
        .filter(Todo.id == todo_id)
        .filter(Todo.owner_id == user.get("id"))
        .first()
    )

    if not todo_model:
        raise HTTPException(status_code=404, detail="Todo not found")

    return todo_model


@router.post("/todo", status_code=status.HTTP_201_CREATED)
def post_todo(user: user_dependency, db: db_dependency, todo_schema: TodoCreate):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated"
        )

    todo_model = Todo(**todo_schema.model_dump(), owner_id=user.get("id"))

    db.add(todo_model)
    db.commit()


@router.put("/todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_todo(
    user: user_dependency,
    db: db_dependency,
    todo_schema: TodoCreate,
    todo_id: int = Path(gt=0),
):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    todo_model = (
        db.query(Todo)
        .filter(Todo.id == todo_id)
        .filter(Todo.owner_id == user.get("id"))
        .first()
    )

    if not todo_model:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo_model.title = todo_schema.title
    todo_model.description = todo_schema.description
    todo_model.priority = todo_schema.priority
    todo_model.complete = todo_schema.complete

    db.add(todo_model)
    db.commit()


@router.delete("/todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(user: user_dependency, db: db_dependency, todo_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    todo_model = (
        db.query(Todo)
        .filter(Todo.id == todo_id)
        .filter(Todo.owner_id == user.get("id"))
        .first()
    )

    if not todo_model:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(todo_model)
    db.commit()
