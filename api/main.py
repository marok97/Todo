from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, is_user_table_empty, is_task_table_empty, SessionLocal
import models
from routers import auth, admin, tasks

models.Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    try:
        yield db

        if is_user_table_empty(db):
            # Add your initial data here
            user_data = [
                {
                    "email": "user1@example.com",
                    "username": "marok",
                    "first_name": "Christoffer",
                    "last_name": "Andersson",
                    "hashed_password": "password1",
                    "is_active": True,
                    "role": "admin",
                },
            ]

            for user_info in user_data:
                user = models.User(**user_info)
                db.add(user)
            db.commit()

        if is_task_table_empty(db):
            task_data = [
                {
                    "status": ""
                }
            ]

    finally:
        db.close()


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
