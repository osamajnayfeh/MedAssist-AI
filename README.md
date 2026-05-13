# MedAssist AI

MedAssist AI is an AI-assisted medical analysis platform that combines a modern web frontend with a Python backend API.

The project supports two primary workflows:

1. Symptom-based analysis using an LLM-powered medical assistant flow.
2. Chest X-ray image analysis using a trained deep learning model.

## Project Name

MedAssist AI

## Problem Statement

Healthcare users and teams often need a fast, structured, and accessible first-pass analysis before a full clinical review.

Common challenges include:

1. Unstructured symptom descriptions that are hard to triage quickly.
2. Delays in obtaining initial interpretation signals for chest scans.
3. Fragmented tooling where frontend intake and backend analysis are disconnected.
4. Limited explainability in early AI outputs for non-technical users.

## Project Goal

MedAssist AI aims to provide a clear and practical pre-diagnostic assistant experience by:

1. Collecting user symptoms through an intuitive interface.
2. Returning structured AI-generated insights (possible condition, severity, causes, suggested actions).
3. Supporting chest X-ray prediction through a dedicated model endpoint.
4. Keeping architecture simple, modular, and ready for future production hardening.

## Project Structure

The repository is organized into frontend, backend, documentation, and run utilities.

### 1. Backend API

Path: Backend API/

Main files:

1. Backend API/main.py
   - FastAPI application entry point.
   - Exposes API routes for symptom analysis and chest prediction.
   - Provides health check and integration wiring.
2. Backend API/requirements.txt
   - Python dependencies for API, AI integration, and model inference.
3. Backend API/models/chest_model.keras
   - Trained chest X-ray model artifact.
4. Backend API/utils/preprocess.py
   - Image preprocessing logic.
5. Backend API/utils/prediction.py
   - Model inference helper functions.
6. Backend API/utils/gemini_helper.py
   - LLM helper for symptom-to-insight generation.
7. Backend API/uploads/
   - Temporary storage for uploaded files.

### 2. Frontend

Path: frontend/

Main folders:

1. frontend/pages/
   - Application pages such as dashboard, diagnosis, analysis, help, and about.
2. frontend/js/
   - API calls, page logic, interaction handlers, and workflow scripts.
3. frontend/css/
   - Styling for dashboard, home, and shared UI components.
4. frontend/assets/images/
   - Static image assets.

### 3. Documentation

Path: documentation/

Includes setup guides, API examples, architecture notes, and summaries.

### 4. Settings and Helpers

Path: settings/

1. settings/start-server.bat
   - Windows batch script for quick backend startup.

## Technology Stack

### Frontend

1. HTML5
2. CSS3
3. Vanilla JavaScript

### Backend

1. Python
2. FastAPI
3. TensorFlow/Keras model inference
4. Gemini API integration (via environment variable)

## Download and Installation

### Option A: Clone with Git

1. Open PowerShell.
2. Run:

```bash
git clone https://github.com/osamajnayfeh/MedAssist-AI.git
```

3. Move into the project:

```bash
cd MedAssist-AI
```

### Option B: Download ZIP

1. Open the repository page in your browser.
2. Click Code.
3. Click Download ZIP.
4. Extract the ZIP.
5. Open the extracted folder in VS Code.

## Detailed Run Guide (Windows)

### 1. Prerequisites

Install the following:

1. Python 3.9 or newer
2. Git (optional, only if cloning)
3. VS Code (recommended)

Verify Python:

```bash
python --version
```

### 2. Open Project Root

From PowerShell:

```bash
cd "path\\to\\MedAssist-AI"
```

### 3. Create and Activate Virtual Environment

```bash
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
```

If execution policy blocks activation, run once in an elevated PowerShell:

```bash
Set-ExecutionPolicy RemoteSigned
```

Then activate again.

### 4. Install Backend Dependencies

```bash
pip install -r "Backend API\\requirements.txt"
```

### 5. Set Environment Variables

Set your Gemini API key for the current PowerShell session:

```bash
$env:GEMINI_API_KEY="your_real_api_key_here"
```

Optional backend configuration:

```bash
$env:HOST="0.0.0.0"
$env:PORT="8000"
```

### 6. Start Backend API

From project root:

```bash
python "Backend API\\main.py"
```

If your app is uvicorn-based through module path, this alternative may be used:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload --app-dir "Backend API"
```

### 7. Validate Backend

Open these URLs:

1. Health endpoint: http://localhost:8000/health
2. API docs: http://localhost:8000/docs

### 8. Run Frontend

Use a local static server from project root:

```bash
python -m http.server 8080
```

Open a page:

1. http://localhost:8080/frontend/pages/home.html
2. http://localhost:8080/frontend/pages/diagnosis-v2.html

### 9. End-to-End Check

1. Open the diagnosis page.
2. Enter symptoms and submit.
3. Confirm request reaches backend API.
4. Verify response renders in the UI.
5. Upload a chest image where applicable and confirm prediction flow.

## Quick Start (Minimum Commands)

```bash
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install -r "Backend API\\requirements.txt"
$env:GEMINI_API_KEY="your_real_api_key_here"
python "Backend API\\main.py"
```

In a second terminal:

```bash
python -m http.server 8080
```

## Creative Project Instructions and Best Practices

These instructions are designed to make the project stronger, safer, and more production-ready.

### 1. Clinical Safety Layer

1. Always show a medical disclaimer near results.
2. If severity is high, force a high-visibility emergency recommendation block.
3. Add a dedicated flag for red-flag symptoms (for example, severe chest pain, oxygen drop, confusion).

### 2. Structured Output Contract

Keep API responses strictly structured:

1. possible_condition
2. severity
3. reasoning
4. recommended_next_step
5. confidence

This keeps frontend rendering stable and easier to test.

### 3. Prompt and AI Guardrails

1. Reject empty or extremely short symptom input.
2. Add prompt hardening to avoid unsafe or irrelevant model output.
3. Log model failures and fallback gracefully to a safe default message.

### 4. Security and Secrets

1. Do not expose API keys in frontend JavaScript.
2. Keep all secrets in environment variables.
3. Add .env.example with placeholder values only.

### 5. Observability

1. Add request IDs to backend logs.
2. Track latency for symptom and image routes.
3. Store error categories to simplify debugging.

### 6. Quality and Testing

1. Add unit tests for preprocessing and prediction helpers.
2. Add API tests for success and failure cases.
3. Add a frontend smoke test for diagnosis submission flow.

### 7. UX Upgrade Ideas

1. Add triage score from 0 to 100 with color bands.
2. Add patient history timeline for previous analyses.
3. Add printable visit summary for doctor consultations.

### 8. Deployment Readiness Checklist

1. Add CORS policy by environment.
2. Validate upload file size and MIME type server-side.
3. Add rate limiting on analysis endpoints.
4. Add centralized exception handling and consistent error schema.

## Troubleshooting

### Backend does not start

1. Confirm virtual environment is activated.
2. Reinstall dependencies.
3. Confirm model file exists at Backend API/models/chest_model.keras.

### Frontend cannot reach API

1. Confirm backend is running on expected host and port.
2. Check CORS configuration.
3. Verify frontend API base URL in JavaScript files.

### Gemini analysis fails

1. Confirm GEMINI_API_KEY is set in active terminal session.
2. Restart backend after changing environment variables.
3. Check backend logs for upstream API errors.

## Roadmap

1. Role-based authentication (doctor/admin).
2. Patient profile and case management.
3. Multi-model support for additional imaging modalities.
4. Explainability dashboard for confidence and feature highlights.
5. Exportable PDF report with clinician-facing format.

## License and Responsibility

This project is an AI-assisted informational tool and is not a replacement for professional medical diagnosis or emergency care.
