from typing import ForwardRef, List
from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: str = Field(min_length=4, max_length=40)
    description: str = Field(min_length=5, max_length=100)
    priority: int = Field(ge=1, le=5)
    status: str = Field(min_length=4, max_length=20)


class TaskCreate(TaskBase):
    pass


class TaskSchema(TaskBase):
    class Config:
        from_attributes = True


class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    role: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str
