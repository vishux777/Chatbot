from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_KEY = "bMAIZN142fbtVFx6eR4ukUt8lXD22l1s"  # Replace with your Mistral API key
API_URL = "https://api.mistral.ai/v1/chat/completions"

@app.route('/categorize', methods=['POST'])
def categorize_expense():
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "mistral-small-latest",
            "messages": [
                {"role": "user", "content": f"Categorize this expense: {message}"}
            ],
            "max_tokens": 50
        }
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json().get('choices', [{}])[0].get('message', {}).get('content', 'No response')
        return jsonify({'text': result})
    except Exception as e:
        return jsonify({'error': f"API Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)