from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so your React frontend can talk to this backend safely
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Extract json data sent from React
        data = request.json
        
        # Accessing all fields sent by the frontend
        ph = float(data.get('ph', 0))
        hardness = float(data.get('hardness', 0))
        solids = float(data.get('solids', 0))
        chloramines = float(data.get('chloramines', 0))
        sulfate = float(data.get('sulfate', 0))
        conductivity = float(data.get('conductivity', 0))
        organic_carbon = float(data.get('organicCarbon', 0))
        trihalomethanes = float(data.get('trihalomethanes', 0))
        turbidity = float(data.get('turbidity', 0))

        # --- MACHINE LEARNING INTEGRATION PLACEHOLDER ---
        # This is where you would load your ML model (e.g., joblib.load('model.pkl'))
        # and do: prediction = model.predict([[ph, hardness, solids, ...]])
        #
        # For demonstration, let's just make a dummy calculation:
        if ph >= 6.5 and ph <= 8.5 and turbidity < 5:
            result = "Potable (Safe Water)"
        else:
            result = "Not Potable (Unsafe Water)"
        # ------------------------------------------------

        # Return the response back to React
        return jsonify({
            "status": "success",
            "prediction": result
        }), 200

    except ValueError:
        return jsonify({"status": "error", "message": "Invalid numeric data provided"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Run the server on port 5000
    app.run(debug=True, port=5000)