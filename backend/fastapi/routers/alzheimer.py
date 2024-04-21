import io
import os
import datetime
import uuid
# from datetime import datetime

import torch
import torch.nn.functional as F
import torchvision.transforms as T
from database import alzheimer_preds
from dotenv import load_dotenv
from jose import JWTError, jwt
from mobilenetv3 import MobilenetV3
from models import AlzheimerPredsModel
from neural_compressor.utils.pytorch import load
from PIL import Image

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.security import HTTPBearer

load_dotenv()

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


mean = [0.2951, 0.2955, 0.2957]
std = [0.3167, 0.3168, 0.3168]
# class_names = [
#     "Mildly Demented",
#     "Moderately Demented",
#     "Non Demented",
#     "Very Mildly Demented",
# ]


model = MobilenetV3()

int8_model = load("./torch_model/alzheimer", model=model)
int8_model.eval()

transforms = T.Compose(
    [
        T.Resize(256),
        T.CenterCrop(224),
        T.ToTensor(),
        T.Normalize(mean, std),
    ]
)


@router.post("/predict")
async def predict(file: UploadFile = File(...), auth: str = Depends(security)):
    try:
        payload = jwt.decode(auth.credentials, key=SECRET_KEY, algorithms=[ALGORITHM])
        admin_id = payload["adminId"]
    except JWTError:
        raise HTTPException(401, "Invalid JWT Token")

    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transforms(image).unsqueeze(0)

    with torch.no_grad():
        predictions = int8_model(input_tensor).data.cpu().squeeze()
    probabilities = F.softmax(predictions, dim=0).numpy()

    response = AlzheimerPredsModel(
        # id=str(uuid.uuid4()),
        timestamp=datetime.datetime.now(datetime.UTC),
        admin_id=admin_id,
        mildly_demented=float(probabilities[0]),
        moderately_demented=float(probabilities[1]),
        non_demented=float(probabilities[2]),
        very_mildly_demented=float(probabilities[3])
    )

    print(response.model_dump())

    inserted = await alzheimer_preds.insert_one(response.model_dump())
    inserted_id = str(inserted.inserted_id)
    response.id = inserted_id
    
    return response

    
    