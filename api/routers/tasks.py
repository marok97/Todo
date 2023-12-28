from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from models import Task
from schemas import TaskCreate, TaskSchema
from starlette import status
from dependencies.db_dependency import get_db
from .auth import get_current_user


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

router = APIRouter(tags=["tasks"])


@router.get("/tasks")
def get_tasks(user: user_dependency, db: db_dependency) -> list[TaskSchema]:
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    tasks = db.query(Task).filter(Task.owner_id == user.get("id")).all()
    return tasks


@router.get("/task/{task_id}")
def get_task_by_id(user: user_dependency, db: db_dependency, task_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    task_model = (
        db.query(Task)
        .filter(Task.id == task_id)
        .filter(Task.owner_id == user.get("id"))
        .first()
    )

    if not task_model:
        raise HTTPException(status_code=404, detail="Task not found")

    return task_model


@router.post("/task", status_code=status.HTTP_201_CREATED)
def post_todo(user: user_dependency, db: db_dependency, task_create_schema: TaskCreate):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated"
        )

    try:
        task_model = Task(**task_create_schema.model_dump(), owner_id=user.get("id"))

        db.add(task_model)
        db.commit()

        message = "Task created"

    except Exception as e:
        message = "Task not created"

    return {"message": message}


@router.put("/task/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_task(
    user: user_dependency,
    db: db_dependency,
    task_schema: TaskCreate,
    task_id: int = Path(gt=0),
):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    task_model = (
        db.query(Task)
        .filter(Task.id == task_id)
        .filter(Task.owner_id == user.get("id"))
        .first()
    )

    if not task_model:
        raise HTTPException(status_code=404, detail="Task not found")

    task_model.title = task_schema.title
    task_model.description = task_schema.description
    task_model.priority = task_schema.priority
    task_model.complete = task_schema.complete

    db.add(task_model)
    db.commit()


@router.delete("/task/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(user: user_dependency, db: db_dependency, task_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    task_model = (
        db.query(Task)
        .filter(Task.id == task_id)
        .filter(Task.owner_id == user.get("id"))
        .first()
    )

    if not task_model:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task_model)
    db.commit()
