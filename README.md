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

# Install required dependencies
pip install -r requirements.txt

# Start the Flask API
python backend.py
