"""ClinicalMind prediction stub."""

from model import load_model
from preprocess import preprocess_image


def predict(image_path: str):
    """Run a placeholder prediction pipeline for future backend integration."""
    _ = load_model()
    _ = preprocess_image(image_path)
    return {
        "condition": "Normal",
        "confidence": 0.87,
        "recommendation": "Continue routine follow-up and clinical observation.",
    }


if __name__ == "__main__":
    result = predict("sample.png")
    print(result)
