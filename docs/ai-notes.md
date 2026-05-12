# AI Notes

Current implementation uses mock predictions from frontend logic for rapid iteration.

Planned backend contract:
- POST /api/v1/predict
- Multipart image upload
- JSON response:
  - condition: string
  - confidence: number
  - recommendation: string
