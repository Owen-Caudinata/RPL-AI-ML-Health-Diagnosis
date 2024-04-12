import io
import os

import torch
import torch.nn.functional as F
import torchvision.transforms as T
from dotenv import load_dotenv
from jose import JWTError, jwt
from mobilenetv3 import MobilenetV3
from neural_compressor.utils.pytorch import load
from PIL import Image

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.security import HTTPBearer

load_dotenv()

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

mean = [0.4823, 0.4823, 0.4823]
std = [0.2456, 0.2456, 0.2456]
class_names = [
    "Normal",
    "Pneumonia",
]

model = MobilenetV3()

int8_model = load("./torch_model/pneumonia", model=model)
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
        admin_id = jwt.decode(auth.credentials, key=SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(401, "Invalid JWT Token")
    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transforms(image).unsqueeze(0)

    with torch.no_grad():
        predictions = int8_model(input_tensor).data.cpu().squeeze()
    probabilities = F.softmax(predictions, dim=0).numpy()

    response = {
        class_name: float(probability)
        for class_name, probability in zip(class_names, probabilities)
    }

    return response
