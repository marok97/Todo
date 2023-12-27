from typing import ForwardRef, List
from pydantic import BaseModel, Field



class TaskCreate(BaseModel):
    status: str = Field(min_length=4, max_length=20)




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
