from typing import ForwardRef, List
from pydantic import BaseModel, Field


class TodoListSchema(BaseModel):
    title: str = Field(min_length=4, max_length=20)
    description: str = Field(min_length=4, max_length=100)
    priority: int

    class Config:
        orm_mode = True


TodoListModel = ForwardRef(List[TodoListSchema])


class TodoCreate(BaseModel):
    status: str = Field(min_length=4, max_length=20)
    todos: List[TodoListModel] = []

    class Config:
        orm_mode = True


TodoCreate.model_rebuild()


class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str
