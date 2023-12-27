from database import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import Relationship


class User(BaseModel):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String)

    # Relationships
    todos = Relationship("Todo", back_populates="owner", passive_deletes=True)


class Todo(BaseModel):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    status = Column(String)

    # Relationships
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = Relationship("User", back_populates="todos")

    todo_list = Relationship("TodoList", back_populates="todo_list", passive_deletes=True)


class TodoList(BaseModel):
    __tablename__ = "todo_list"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)

    #Relationships
    todo_id = Column(Integer, ForeignKey("todos.id"))
    todo_list = Relationship("Todo", back_populates="todo_list", passive_deletes=True)
