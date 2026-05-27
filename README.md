# 🚰 Water Quality ML Predictor

An end-to-end web application that evaluates water metrics (like pH, Hardness, and Turbidity) using a Machine Learning backend to predict whether water sample parameters indicate it is **Potable** or **Non-Potable**.

---

## 🚀 Features
* **Interactive Frontend:** Built with React and styled beautifully using Tailwind CSS.
* **Robust Backend API:** Developed using Flask to process parameters and feed them seamlessly into an analytical evaluation pipeline.
* **Cross-Origin Enabled:** Configurations utilizing `flask-cors` to bridge client-server communications perfectly.

---

## 🛠️ Tech Stack
* **Frontend:** React, Tailwind CSS
* **Backend:** Python, Flask, Flask-CORS
* **Dependencies Tracking:** Pip (`requirements.txt`)

---

## 📦 Installation & Setup

Follow these steps to spin up both the backend and frontend development environments.

### 1. Backend Setup (Flask)
Navigate to your project root folder, activate your local Python 3.12 environment, and launch the server.

```bash
# Create a virtual environment (if you haven't already)
& "C:\Users\ACER\AppData\Local\Programs\Python\Python312\python.exe" -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

## 🧠 Machine Learning & Architecture Deep Dive

This project implements a custom Deep Learning pipeline centered around an **Artificial Neural Network (ANN)** built using TensorFlow/Keras to classify water samples. Below is an in-depth breakdown of the data engineering and model training lifecycle.

---

### 📊 Data Preprocessing & Advanced Feature Engineering

Raw data requires careful curation before it is passed to a neural network. The preprocessing pipeline applies specialized strategies to clean, filter, and augment the water metrics:

#### 1. Targeted Class-Based Median Imputation
Instead of filling missing values (`NaN`) with a generic global average, the dataset is split by its target class (`Potable` vs. `Non-Potable`). Missing attributes are dynamically filled using the median value *specific to that group*. This prevents data leakage and ensures clean distributions.

#### 2. Statistical Outlier Removal (Interquartile Range)
Extreme mathematical anomalies are eliminated using the **IQR (Interquartile Range) Method**. Data points falling outside $1.5 \times \text{IQR}$ of the lower and upper bounds are discarded to remove highly unrepresentative, toxic, or faulty sensor readings.
$$\text{Lower Bound} = Q1 - (1.5 \times \text{IQR})$$
$$\text{Upper Bound} = Q3 + (1.5 \times \text{IQR})$$

#### 3. Domain-Specific Feature Engineering
To help the neural network understand complex multi-variable interactions, three synthetic features are calculated and appended to the data structure:
* **Sulfate to Chloramine Ratio:** Tracks the chemical balance between secondary disinfectants and residual minerals. Includes a tiny stabilizer ($10^{-5}$) to prevent division-by-zero errors.
  $$\text{Sulfate\_Chloramine\_Ratio} = \frac{\text{Sulfate}}{\text{Chloramines} + 10^{-5}}$$
* **Hardness & pH Interaction:** Captures the alkalinity context of water hardness, as mineral solubility depends heavily on current acidic or basic states.
  $$\text{Hardness\_pH\_Interaction} = \text{Hardness} \times \text{pH}$$
* **TDS to Hardness Ratio:** Compares overall Total Dissolved Solids (Solids) against structural divalent minerals (Hardness).
  $$\text{TDS\_Hardness\_Ratio} = \frac{\text{Solids}}{\text{Hardness} + 10^{-5}}$$

#### 4. Feature Standardization
Neural networks are highly sensitive to variable scales. A `StandardScaler` maps all inputs to a mean of 0 and a standard deviation of 1. The calculated scaling parameters are serialized into `ann_scaler.pkl` to safely process incoming production queries on the Flask backend.

---

### 🏗️ Artificial Neural Network (ANN) Architecture

The classification model uses a deep multi-layer perceptron topology designed with a sequence of dense layer structures configured as follows:

| Layer Type | Configuration / Units | Activation | Purpose / Structural Details |
| :--- | :--- | :--- | :--- |
| **Input + Dense 1** | 64 Neurons | `ReLU` | Maps 12 input features into a high-dimensional space. |
| **Dropout 1** | Rate = `0.3` | — | Randomly deactivates 30% of neurons to break up co-dependency patterns. |
| **Dense 2** | 32 Neurons | `ReLU` | Processes non-linear feature abstractions down to a tighter space. |
| **Dropout 2** | Rate = `0.2` | — | Drops 20% of weights to prevent overfitting on validation segments. |
| **Dense 3** | 16 Neurons | `ReLU` | Final representation step prior to decision boundaries. |
| **Output Layer** | 1 Neuron | `Sigmoid` | Compresses numerical scores into a strict probability range between $[0.0, 1.0]$. |

```text
  [Input Features] ➡️ (Dense 64) ➡️ [Dropout 30%] ➡️ (Dense 32) ➡️ [Dropout 20%] ➡️ (Dense 16) ➡️ (Sigmoid 1) ➡️ [Prediction]

# Install required dependencies
pip install -r requirements.txt

# Start the Flask API
python backend.py
