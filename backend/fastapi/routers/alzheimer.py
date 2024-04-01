import torch
import torch.nn.functional as F
from neural_compressor.utils.pytorch import load
from torch import nn
from torchvision.models import mobilenet_v3_small


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
input_data = torch.randn(1, 3, 224, 224)
predictions = int8_model(input_data)
softmax_predictions = F.softmax(predictions, dim=1)

print(softmax_predictions.numpy()[0].sum())
