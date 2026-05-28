import os
import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

# Optional: Silences extra TensorFlow startup warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

app = Flask(__name__)
# Enable CORS so your React frontend can talk to this backend safely
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ==========================================
# LOAD PRODUCTION ML MODELS
# ==========================================
try:
    model = load_model("water_potability_ann.h5")
    scaler = joblib.load("ann_scaler.pkl")
    print("🚀 ML Model and Scaler loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model/scaler: {str(e)}")
    print(
        "Make sure 'water_potability_ann.h5' and 'ann_scaler.pkl' are in the same folder as this script."
    )


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        # Extract json data sent from React
        data = request.json

        # 1. Access raw fields (Matching frontend keys)
        ph = float(data.get("ph", 0))
        hardness = float(data.get("hardness", 0))
        solids = float(data.get("solids", 0))
        chloramines = float(data.get("chloramines", 0))
        sulfate = float(data.get("sulfate", 0))
        conductivity = float(data.get("conductivity", 0))
        organic_carbon = float(data.get("organicCarbon", 0))
        trihalomethanes = float(data.get("trihalomethanes", 0))
        turbidity = float(data.get("turbidity", 0))

        # --- DATA VALIDATION (Now inside the route and try/except block) ---
        # --- UPDATE DATA VALIDATION INSIDE YOUR PREDICT() ROUTE ---

        # 1. Broad physical constraint check (to catch input typos)
        if ph < 0 or ph > 14:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "pH must be a realistic value between 0 and 14.",
                    }
                ),
                400,
            )

        # 2. STRICT BIOLOGICAL LIMITS (Bypass the AI if the water is obviously toxic)
        if ph < 4.5 or ph > 10.0:
            return (
                jsonify(
                    {
                        "status": "success",
                        "prediction": "Not Potable (Highly Toxic pH Level)",
                        "confidence": 1.0,
                    }
                ),
                200,
            )

        if (
            hardness < 0
            or solids < 0
            or chloramines < 0
            or sulfate < 0
            or conductivity < 0
        ):
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Water properties like conductivity, solids, and hardness cannot be negative numbers.",
                    }
                ),
                400,
            )

        if organic_carbon < 0 or trihalomethanes < 0 or turbidity < 0:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Contaminants and turbidity levels cannot be negative numbers.",
                    }
                ),
                400,
            )

        # 2. Engineer the 3 interaction features (Must match training code exactly)
        sulfate_chloramine_ratio = sulfate / (chloramines + 1e-5)
        hardness_ph_interaction = hardness * ph
        tds_hardness_ratio = solids / (hardness + 1e-5)

        # 3. Create a DataFrame to keep feature names and sequence uniform
        input_data = pd.DataFrame(
            [
                [
                    ph,
                    hardness,
                    solids,
                    chloramines,
                    sulfate,
                    conductivity,
                    organic_carbon,
                    trihalomethanes,
                    turbidity,
                    sulfate_chloramine_ratio,
                    hardness_ph_interaction,
                    tds_hardness_ratio,
                ]
            ],
            columns=[
                "ph",
                "Hardness",
                "Solids",
                "Chloramines",
                "Sulfate",
                "Conductivity",
                "Organic_carbon",
                "Trihalomethanes",
                "Turbidity",
                "Sulfate_Chloramine_Ratio",
                "Hardness_pH_Interaction",
                "TDS_Hardness_Ratio",
            ],
        )

        # 4. Scale the input data using the loaded production scaler
        input_scaled = scaler.transform(input_data)

        # 5. Generate prediction probability from the ANN
        prediction_prob = model.predict(input_scaled)[0][0]

        # 6. Convert probability to class using the 0.5 threshold
        if prediction_prob > 0.5:
            result = "Potable (Safe Water)"
        else:
            result = "Not Potable (Unsafe Water)"

        # Return the response back to React along with the raw confidence probability
        return (
            jsonify(
                {
                    "status": "success",
                    "prediction": result,
                    "confidence": float(prediction_prob),
                }
            ),
            200,
        )

    except ValueError:
        return (
            jsonify(
                {"status": "error", "message": "Invalid numeric data provided"}
            ),
            400,
        )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    # Run the server on port 5000
    app.run(debug=True, port=5000)