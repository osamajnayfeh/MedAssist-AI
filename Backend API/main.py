from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.models import load_model

import os
import io
import json
import requests
import numpy as np
from PIL import Image

from typing import Optional
from pathlib import Path


CHEST_MODEL_PATH = Path(__file__).resolve().parent / 'models' / 'chest_model.keras'
CHEST_LABELS = ['Unknown', 'Pneumonia', 'Tuberculosis', 'Normal']
BRAIN_LABELS = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary Tumor']
BONE_LABELS = ['Fractured', 'Not Fractured']

CLASS_NAMES_MAP = {
    'chest': CHEST_LABELS,
    'brain': BRAIN_LABELS,
    'bone': BONE_LABELS
}

# Initialize FastAPI app
app = FastAPI(
    title="MedAssist AI API",
    version="1.0.0"
)


# Load AI Models (attempt, continue on failure)
brain_model = None
chest_model = None
bone_model = None

try:
    brain_path = Path(__file__).resolve().parent / 'models' / 'brain_model.keras'
    brain_model = load_model(str(brain_path))
    print(f"Brain model loaded from: {brain_path}")
except Exception as e:
    brain_model = None
    print(f"Warning: could not load brain model: {e}")

try:
    chest_model = load_model(str(CHEST_MODEL_PATH))
    print("Chest model loaded")
except Exception as e:
    print(f"Warning: could not load chest model: {e}")

try:
    bone_path = Path(__file__).resolve().parent / 'models' / 'bone_model.keras'
    if bone_path.exists():
        bone_model = load_model(str(bone_path))
        print(f"Bone model loaded from: {bone_path}")
    else:
        print(f"Warning: bone model not found at {bone_path}")
except Exception as e:
    print(f"Warning: could not load bone model: {e}")


# Load .env file if exists
env_file = Path(__file__).resolve().parent.parent / 'settings' / '.env'

if not env_file.exists():
    env_file = Path(__file__).parent / '.env'

if env_file.exists():

    with open(env_file, 'r') as f:

        for line in f:

            line = line.strip()

            if line and not line.startswith('#') and '=' in line:

                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure Gemini API
GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY",
    "YOUR_API_KEY_HERE"
)

if GEMINI_API_KEY == "YOUR_API_KEY_HERE":

    print("WARNING: GEMINI_API_KEY not set!")

else:

    print(f"Gemini API Key loaded: {GEMINI_API_KEY[:10]}...")


# Pydantic models
class SymptomsRequest(BaseModel):

    symptoms: str
    language: Optional[str] = "en"


class DiagnosisResponse(BaseModel):

    disease_name: str
    severity: str
    causes: list[str]
    treatments: list[str]
    status: str = "success"


def get_gemini_error_detail(response: requests.Response) -> str:
    try:
        payload = response.json()
        error = payload.get("error", {})
        message = error.get("message")
        status = error.get("status")
        if message and status:
            return f"Gemini API Error: {response.status_code} ({status}) - {message}"
        if message:
            return f"Gemini API Error: {response.status_code} - {message}"
    except Exception:
        pass

    body = (response.text or "").strip()
    if body:
        return f"Gemini API Error: {response.status_code} - {body[:1000]}"

    return f"Gemini API Error: {response.status_code}"


# Analyze Symptoms Endpoint
@app.post(
    "/analyze-symptoms",
    response_model=DiagnosisResponse
)

async def analyze_symptoms(request: SymptomsRequest):

    try:

        if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_API_KEY_HERE":
            raise HTTPException(
                status_code=503,
                detail="GEMINI_API_KEY is missing or not configured in settings/.env or Backend API/.env"
            )

        if not request.symptoms or len(request.symptoms.strip()) < 5:

            raise HTTPException(
                status_code=400,
                detail="Please provide valid symptoms"
            )

        prompt = f"""
You are an expert medical AI assistant.

Analyze the following symptoms:

Symptoms:
{request.symptoms}

Return ONLY valid JSON in this format:

{{
    "disease_name": "",
    "severity": "",
    "causes": [],
    "treatments": []
}}
"""

        # Gemini API URL
        url = (
            "https://generativelanguage.googleapis.com/v1/models/"
            f"gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
        )

        headers = {
            "Content-Type": "application/json"
        }

        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }

        # Send request to Gemini
        response = requests.post(
            url,
            headers=headers,
            json=data,
            timeout=30
        )

        if response.status_code != 200:

            raise HTTPException(
                status_code=500,
                detail=get_gemini_error_detail(response)
            )

        result = response.json()

        # Extract text from response
        response_text = (
            result["candidates"][0]
            ["content"]["parts"][0]["text"]
            .strip()
        )

        # Remove markdown if exists
        if response_text.startswith("```json"):

            response_text = (
                response_text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        elif response_text.startswith("```"):

            response_text = (
                response_text
                .replace("```", "")
                .strip()
            )

        # Convert response to JSON
        diagnosis_data = json.loads(response_text)

        # Validate required fields
        required_fields = [
            "disease_name",
            "severity",
            "causes",
            "treatments"
        ]

        for field in required_fields:

            if field not in diagnosis_data:

                raise HTTPException(
                    status_code=500,
                    detail=f"Missing field: {field}"
                )

        # Return response
        return DiagnosisResponse(
            disease_name=diagnosis_data["disease_name"],
            severity=diagnosis_data["severity"],
            causes=diagnosis_data["causes"],
            treatments=diagnosis_data["treatments"],
            status="success"
        )

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# Chest X-ray Endpoint
@app.post("/predict-chest")
async def predict_chest(file: UploadFile = File(...)):
    # Delegate to the generic inference function for the 'chest' category
    return await _predict_for_category('chest', file)


@app.post("/predict")
async def predict_generic(file: UploadFile = File(...), category: str = 'chest'):
    """Generic predict endpoint. Use form-data with 'file' and optional 'category' ('chest'|'brain')."""
    category = (category or 'chest').lower()
    if category not in ('chest', 'brain'):
        # Accept unknown categories but default to chest
        category = 'chest'

    return await _predict_for_category(category, file)


async def _predict_for_category(category: str, file: UploadFile):
    """Generic inference path that selects the model and class names
    for the requested category and returns a consistent response.
    """
    model = None
    if category == 'chest':
        model = chest_model
    elif category == 'brain':
        model = brain_model
    elif category == 'bone':
        model = bone_model
    else:
        # fallback to chest for unknown categories
        model = chest_model

    if model is None:
        raise HTTPException(status_code=503, detail=f"Model for category '{category}' is not loaded")

    # Inspect model input shape
    try:
        input_shape = model.input_shape
    except Exception:
        input_shape = None

    if not input_shape:
        raise HTTPException(
            status_code=500,
            detail="Model input shape is unknown. Cannot preprocess image without input dimensions."
        )

    # determine height/width
    try:
        if len(input_shape) == 4:
            _, h, w, c = input_shape
        elif len(input_shape) == 3:
            h, w, c = input_shape
        else:
            raise ValueError("Unsupported input shape")
    except Exception:
        raise HTTPException(status_code=500, detail=f"Unsupported or unknown model input shape: {input_shape}")

    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        img = img.resize((int(w), int(h)))
        arr = np.asarray(img).astype('float32')

        # Add batch dim
        if arr.ndim == 3:
            arr = np.expand_dims(arr, 0)

        prediction = model.predict(arr)
        predicted_index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]) * 100)

        class_names = CLASS_NAMES_MAP.get(category, CHEST_LABELS)

        if predicted_index >= len(class_names):
            raise HTTPException(
                status_code=500,
                detail=(
                    f"Model output index {predicted_index} is out of range for class names "
                    f"({len(class_names)} labels)."
                )
            )

        return {
            "prediction": class_names[predicted_index],
            "confidence": round(confidence, 2)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Health Check Endpoint
@app.get("/health")

async def health_check():

    return {
        "status": "healthy",
        "gemini_configured": (
            GEMINI_API_KEY != "YOUR_API_KEY_HERE"
        )
    }


# Root Endpoint
@app.get("/")

async def root():

    return {
        "name": "MedAssist AI API",
        "version": "1.0.0",
        "endpoints": {
            "/analyze-symptoms": "POST",
            "/predict-chest": "POST",
            "/predict": "POST",
            "/health": "GET",
            "/docs": "GET"
        }
    }


# Run Server
if __name__ == "__main__":

    import uvicorn

    print("Starting MedAssist AI FastAPI Server...")
    print("Server will run at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )