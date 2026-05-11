import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import os

class SkinModel(nn.Module):
    def __init__(self):
        super(SkinModel, self).__init__()
        # Placeholder for a multi-class skin lesion classifier
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((7, 7)),
            nn.Flatten(),
            nn.Linear(32 * 7 * 7, 7) # Example: 7 categories of skin lesions
        )

    def forward(self, x):
        return self.features(x)

class SkinClassifier:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = SkinModel().to(self.device)
        if model_path and os.path.exists(model_path):
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ])

    def predict(self, image_path):
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(image)
            _, predicted = torch.max(outputs, 1)
            probabilities = torch.softmax(outputs, dim=1)
            
        classes = ['Actinic keratoses', 'Basal cell carcinoma', 'Benign keratosis', 'Dermatofibroma', 'Melanocytic nevi', 'Melanoma', 'Vascular lesions']
        return {
            "prediction": classes[predicted.item()],
            "confidence": probabilities[0][predicted.item()].item()
        }
