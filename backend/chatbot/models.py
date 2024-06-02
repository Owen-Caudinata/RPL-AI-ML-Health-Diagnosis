from datetime import datetime
from typing import Annotated, Any, List, Optional, Union
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field
from langchain_core.messages import HumanMessage, AIMessage


class Input(BaseModel):
    input: str
    # role: str = Field(default="Pakar Film")
    # instructions: str = Field(default="")
    # chat_history: List[Union[HumanMessage, AIMessage]]


class Output(BaseModel):
    output: Any
