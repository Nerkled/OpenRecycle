#in terminal call - python backend.py    
# go to http://127.0.0.1:5000/fetch_data
#hit the button then refresh

from flask import Flask, jsonify, request
from flask_cors import CORS
from catGen import genCategories


app = Flask(__name__)
CORS(app)  # This allows CORS for all routes (if ports are different)

#import user input int genCategories

@app.route('/fetch_data', methods=['GET', 'POST'])
def fetch_data():
    if request.method == 'POST':
        data = request.get_json()
        item = data.get('item')
        # Process the item as needed
        response = genCategories(item)
        return jsonify({'message': f'Received item: {response}'})
    else:
        return jsonify({'message': 'working'})

if __name__ == '__main__':
    app.run(debug=True)  # Ensure the port is 5000



