from datetime import datetime
from typing import Annotated, Optional, Union
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