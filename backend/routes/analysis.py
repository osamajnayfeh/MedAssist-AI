import os
from flask import Blueprint, request, jsonify
from models.xray_classifier import XRayClassifier
from models.skin_classifier import SkinClassifier

analysis_bp = Blueprint('analysis', __name__)

# Initialize classifiers
xray_model = XRayClassifier()
skin_model = SkinClassifier()

@analysis_bp.route('/xray', methods=['POST'])
def analyze_xray():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    upload_path = os.path.join('uploads', file.filename)
    file.save(upload_path)
    
    try:
        result = xray_model.predict(upload_path)
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(upload_path):
            os.remove(upload_path)

@analysis_bp.route('/skin', methods=['POST'])
def analyze_skin():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    upload_path = os.path.join('uploads', file.filename)
    file.save(upload_path)
    
    try:
        result = skin_model.predict(upload_path)
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(upload_path):
            os.remove(upload_path)
