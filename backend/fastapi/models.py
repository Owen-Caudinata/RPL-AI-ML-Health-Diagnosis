from datetime import datetime
from typing import Annotated, Any, List, Optional, Union
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field


PyObjectId = Annotated[str, BeforeValidator(str)]

class AlzheimerPredsModel(BaseModel):
    """
    Container for Alzheimer's predictions document.
    """
    id: Optional[str] = None
    timestamp: datetime
    admin_id: int
    mildly_demented: float
    moderately_demented: float
    non_demented: float
    very_mildly_demented: float

    class Config:
        arbitrary_types_allowed = True


class PneumoniaPredsModel(BaseModel):
    """
    Container for Pneumonia's predictions document.
    """
    id: Optional[str] = None
    timestamp: datetime
    admin_id: int
    normal: float
    pneumonia: float

    class Config:
        arbitrary_types_allowed = True


class FetalPredsModel(BaseModel):
    """
    Container for Fetal Health's predictions document.
    """
    id: Optional[str] = None
    timestamp: datetime
    admin_id: int
    normal: float
    suspect: float
    pathological: float

    class Config:
        arbitrary_types_allowed = True

