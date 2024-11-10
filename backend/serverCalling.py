from flask import Flask, jsonify, request
from flask_cors import CORS
from catGen import genCategories


app = Flask(__name__)
CORS(app)  # This allows CORS for all routes (if ports are different)

#import user input int genCategories

@app.route('/fetchdata', methods=['GET', 'POST'])
def fetchdata():
    if request.method == 'POST':
        data = request.getjson()
        item = data.get('item')
        # Process the item as needed
        response = genCategories(item)
        print(response + "response")
        return jsonify({'message': f'Received item: {response}'})
    elif request.method == 'GET':
        return jsonify({'message': 'working'})
    else:
        return jsonify({'message': 'Invalid request'})

if __name__ == '__main__':
    app.run(debug=True)  # Ensure the port is 5000