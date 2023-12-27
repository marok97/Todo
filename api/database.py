from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import exists
from models import User, Task


SQLALCHEMY_DATABASE_URL = "sqlite:///./todosapp.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def is_user_table_empty(session):
    return not session.query(exists().where(User.id.isnot(None))).scalar()

def is_task_table_empty(session):
    return not session.query(exists().where(Task.id.isnot(None))).scalar()

