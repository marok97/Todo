from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
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
    tasks = relationship("Task", back_populates="owner", passive_deletes=True)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    status = Column(String)

    # relationships
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")

    task_list = relationship("TaskList", back_populates="task_list", passive_deletes=True)


class TaskList(Base):
    __tablename__ = "task_list"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)

    #relationships
    task_id = Column(Integer, ForeignKey("tasks.id"))
    task_list = relationship("Task", back_populates="task_list", passive_deletes=True)
