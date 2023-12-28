from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, is_user_table_empty, is_task_table_empty, SessionLocal
import models
from passlib.context import CryptContext
from routers import auth, admin, tasks

models.Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    try:
        if is_user_table_empty(db):
            # Add your initial data here
            bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            password = "password1"
            hashed_password = bcrypt_context.hash(password)

            user_data = [
                {
                    "email": "user1@example.com",
                    "username": "marok",
                    "first_name": "Christoffer",
                    "last_name": "Andersson",
                    "hashed_password": hashed_password,
                    "is_active": True,
                    "role": "admin",
                },
                {
                    "email": "user2@example.com",
                    "username": "notmarok",
                    "first_name": "Anders",
                    "last_name": "Svensson",
                    "hashed_password": hashed_password,
                    "is_active": True,
                    "role": "notadmin",
                },
            ]

            for user_info in user_data:
                user = models.User(**user_info)
                db.add(user)
            db.commit()

        if is_task_table_empty(db):
            task_data = [
                {
                    "title": "Learn FastApi",
                    "description": "Beacause it is awsome",
                    "priority": 4,
                    "status": "In Progress",
                    "owner_id": 1,
                },
                {
                    "title": "Do the dishes",
                    "description": "Beacause you have to",
                    "priority": 2,
                    "status": "In Progress",
                    "owner_id": 1,
                },
                {
                    "title": "Create ChatGpt 7.0",
                    "description": "Quick easy excersise",
                    "priority": 5,
                    "status": "In Progress",
                    "owner_id": 2,
                }
            ]
            for task_info in task_data:
                task = models.Task(**task_info)
                db.add(task)
            db.commit()
    finally:
        db.close()

    yield


app = FastAPI(title="TodoApp", lifespan=lifespan)
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(admin.router)
