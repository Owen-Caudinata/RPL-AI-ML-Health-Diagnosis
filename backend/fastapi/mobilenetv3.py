import torch
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
    
