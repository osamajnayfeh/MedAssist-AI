from flask import Blueprint, request, jsonify

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/query', methods=['POST'])
def query_assistant():
    data = request.json
    user_query = data.get('query')
    
    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    # RAG logic would go here:
    # 1. Embed query
    # 2. Search vector DB (ChromaDB)
    # 3. Augment prompt with context
    # 4. Generate response via LLM (OpenAI)

    return jsonify({
        "status": "success",
        "response": "Based on clinical guidelines, the symptoms you described correlate with...",
        "citations": ["WHO Medical Manual 2024", "Journal of Clinical Medicine"]
    })
