# ClinicalMind

ClinicalMind is a learning-first healthcare AI project built with HTML, CSS, JavaScript, and Python.

## Current Status

Implemented in this phase:
- Multi-page frontend scaffold
- Shared design system and global JavaScript
- Authentication page skeletons with basic localStorage flow
- Upload to mock analysis to results flow
- JSON sample data files
- Python AI pipeline stubs
- Project docs for architecture, setup, AI notes, and troubleshooting

Not implemented yet:
- Real model inference
- Real backend API
- Production authentication and session security
- Database integration
- Deployment pipeline

## Architecture Approach

Why this structure:
- beginner-friendly
- easy to maintain
- lightweight
- fast to build
- clear separation between UI and future AI backend

The project intentionally avoids heavy frameworks in early milestones to keep the learning curve manageable.

## Project Structure

```text
ClinicalMind/
├── index.html
├── dashboard.html
├── upload.html
├── results.html
├── history.html
├── login.html
├── register.html
├── about.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
├── components/
├── data/
├── ai/
│   └── datasets/
├── uploads/
├── docs/
├── README.md
└── .gitignore
```

## Main Pages

- index.html: landing page and navigation hub
- dashboard.html: summary panel scaffold
- upload.html: file upload and preview with mock analysis trigger
- results.html: reads and renders stored mock prediction
- history.html: placeholder for historical records and filters
- login.html and register.html: basic local auth flow scaffold
- about.html: project context and goals

## Frontend Modules

assets/css:
- style.css: global theme, layout, typography, responsive rules
- dashboard.css, upload.css, auth.css, results.css: page-level styles

assets/js:
- main.js: active nav highlighting and theme persistence
- dashboard.js: dashboard placeholder module
- upload.js: preview and mock result creation
- results.js: result renderer
- auth.js: register/login localStorage flow
- api.js: backend API contract notes for future integration

## Data and AI

data:
- users.json
- reports.json
- history.json

ai:
- model.py: model loader stub
- preprocess.py: preprocessing stub
- predict.py: prediction stub

## Run the Project

Frontend:
1. Open folder in VS Code.
2. Start Live Server from index.html.
3. Navigate across pages from the header links.

Python stub test:
1. Open terminal in the ai folder.
2. Run:

```bash
python predict.py
```

## Troubleshooting

- JS not loading: verify relative path, for example assets/js/main.js
- CSS not loading: verify relative path, for example assets/css/style.css
- Images missing: store in assets/images and reference exact filenames
- Python not running: verify installation with python --version

## Next Milestones

1. Replace mock flow with real API calls through api.js.
2. Add backend service (recommended: FastAPI) for /api/v1/predict.
3. Connect backend service to ai stubs and evolve them into real model inference.
4. Add test coverage and production-ready auth/data layers.
