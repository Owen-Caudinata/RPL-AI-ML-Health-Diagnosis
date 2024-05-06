import os
# from datetime import datetime

from dotenv import load_dotenv

from fastapi import APIRouter
from fastapi.security import HTTPBearer

load_dotenv()

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")