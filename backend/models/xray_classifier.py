import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image

class XRayModel(nn.Module):
    def __init__(self):
        super(XRayModel, self).__init__()
        # Placeholder for a real CNN architecture like ResNet or DenseNet
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(64 * 112 * 112, 2) # Binary classification: Normal vs Pneumonia
        )

    def forward(self, x):
        return self.features(x)

class XRayClassifier:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = XRayModel().to(self.device)
        if model_path and os.path.exists(model_path):
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

    def predict(self, image_path):
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(image)
            _, predicted = torch.max(outputs, 1)
            probabilities = torch.softmax(outputs, dim=1)
            
        classes = ['Normal', 'Pneumonia']
        return {
            "prediction": classes[predicted.item()],
            "confidence": probabilities[0][predicted.item()].item()
        }
