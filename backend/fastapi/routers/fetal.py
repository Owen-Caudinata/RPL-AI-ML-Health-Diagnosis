import datetime
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
from pydantic import BaseModel
from catboost import CatBoostClassifier
import numpy as np

from models import FetalPredsModel
from database import fetal_preds

# Load environment variables
load_dotenv()

# Initialize FastAPI router and security
router = APIRouter()
security = HTTPBearer()

# Get the secret key and algorithm from environment variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Load the trained CatBoost model
model = CatBoostClassifier()
model.load_model("./catboost_model/fetal_health_classifier.cbm")


# Define a Pydantic model for the input data
class PredictionInput(BaseModel):
    mean_stv: float
    percent_altv: float
    astv: float
    mean_hist: float
    prolongued_decelerations: float


# Define the prediction route
@router.post("/predict")
async def predict(input_data: PredictionInput, auth: str = Depends(security)):
    # Verify JWT token
    try:
        payload = jwt.decode(auth.credentials, key=SECRET_KEY, algorithms=[ALGORITHM])
        admin_id = payload["adminId"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid JWT Token")

    # Prepare the input data for prediction
    features = np.array(
        [
            [
                input_data.mean_stv,
                input_data.percent_altv,
                input_data.astv,
                input_data.mean_hist,
                input_data.prolongued_decelerations,
            ]
        ]
    )

    # Make prediction
    # prediction = model.predict(features)
    probabilities = model.predict_proba(features).tolist()[0]   
    print(probabilities)

    response = FetalPredsModel(
        # id=str(uuid.uuid4()),
        timestamp=datetime.datetime.now(datetime.UTC),
        admin_id=admin_id,
        normal=float(probabilities[0]),
        suspect=float(probabilities[1]),
        pathological=float(probabilities[2]),
    )

    print(response.model_dump())

    inserted = await fetal_preds.insert_one(response.model_dump())
    inserted_id = str(inserted.inserted_id)
    response.id = inserted_id
    
    return response
