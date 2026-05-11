from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from routes.analysis import analysis_bp
from routes.chat import chat_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(analysis_bp, url_prefix='/api/analysis')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'medassist-secret-key')
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "MedAssist AI Backend is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
