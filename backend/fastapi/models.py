from datetime import datetime
from typing import Annotated, Any, List, Optional, Union
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field
from langchain_core.messages import HumanMessage, AIMessage

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


class Input(BaseModel):
    input: str
    # role: str = Field(default="Pakar Film")
    # instructions: str = Field(default="")
    # chat_history: List[Union[HumanMessage, AIMessage]]


class Output(BaseModel):
    output: Any