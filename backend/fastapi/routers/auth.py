import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from passlib.context import CryptContext


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

async def get_token_from_header(request: Request) -> Optional[str]:
    authorization: str = request.headers.get("Authorization")
    if not authorization:
        return None
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            return None
        return token
    except ValueError:
        return None


async def decode_jwt(token: str, token_secret: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, token_secret, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        return None


async def authenticate_user(request: Request, token_secret: str = SECRET_KEY) -> Optional[dict]:
    token = await get_token_from_header(request)
    if not token:
        return None
    
    payload = await decode_jwt(token, token_secret)
    return payload












