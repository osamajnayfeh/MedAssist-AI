@echo off
echo ========================================
echo  MedAssist AI - FastAPI Server Startup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

echo [1/3] Checking Python installation...
python --version
echo.

echo [2/3] Installing dependencies...
pip install -r "..\Backend API\requirements.txt"
echo.

echo [3/3] Starting FastAPI server...
echo.
echo Server will start at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python "..\Backend API\main.py"

pause
