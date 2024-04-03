import io
from fastapi import File, UploadFile
import torch
import torch.nn.functional as F
from neural_compressor.utils.pytorch import load
from torch import nn
from torchvision.models import mobilenet_v3_small
import torchvision.transforms as T
from PIL import Image

from fastapi import APIRouter

router = APIRouter()

mean = [0.2951, 0.2955, 0.2957]
std = [0.3167, 0.3168, 0.3168]
class_names = ["Mildly Demented", "Moderately Demented", "Non Demented", "Very Mildly Demented"]

class MobilenetV3(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = mobilenet_v3_small()

        num_class = 4
        self.model.classifier = nn.Sequential(
            torch.nn.Linear(in_features=576, out_features=256, bias=True),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0),
            torch.nn.Linear(in_features=256, out_features=num_class, bias=True),
        )

    def forward(self, x):
        return self.model(x)


model = MobilenetV3()

int8_model = load("./torch_model/alzheimer", model=model)
int8_model.eval()

transforms = T.Compose(
    [
        T.Resize([256, 256], antialias=True),
        T.CenterCrop(224),
        T.ToTensor(),
        T.Normalize(mean, std),
    ]
)


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transforms(image).unsqueeze(0)

    with torch.no_grad():
        predictions = int8_model(input_tensor).data.cpu().squeeze()
    probabilities = F.softmax(predictions, dim=0).numpy()

    # Create response dictionary with class names and probabilities
    response = {class_name: float(probability) for class_name, probability in zip(class_names, probabilities)}

    return response
