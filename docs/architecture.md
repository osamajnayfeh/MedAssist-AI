# ClinicalMind Architecture

## Current Phase
This repository currently uses a static multi-page frontend with local mock data and JavaScript-driven interactions.

## Layers
- Presentation: HTML pages and CSS in assets/css
- Interaction: JavaScript modules in assets/js
- Mock persistence: JSON files in data
- AI stubs: Python files in ai for future API integration

## Hybrid AI Direction
Phase now: mock analysis in frontend.
Phase later: backend API (recommended FastAPI) that wraps ai/model.py, ai/preprocess.py, and ai/predict.py.
