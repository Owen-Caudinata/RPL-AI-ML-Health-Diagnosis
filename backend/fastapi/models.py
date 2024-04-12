from typing import Union
from pydantic import BaseModel


class AlzheimerPrediction(BaseModel):
    uid: str


class PneumoniaPrediction(BaseModel):
    uid: str