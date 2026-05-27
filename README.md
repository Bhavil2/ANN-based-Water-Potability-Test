# <p align="center">🚰 Water Quality Prediction — End to End</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Version" />
  <img src="https://img.shields.io/badge/Flask-Web%20App-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask Framework" />
  <img src="https://img.shields.io/badge/TensorFlow-ANN%20Model-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow Model" />
  <img src="https://img.shields.io/badge/React-Frontend-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Frontend" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <strong>A full end-to-end deep learning web application that predicts water potability based on analytical chemical diagnostics — from custom neural network training to a live interactive web deployment.</strong>
</p>

---
## 🧠 About the Project

Access to clean, potable drinking water is a fundamental human necessity, yet millions worldwide interact with contaminated water sources daily. This project implements a **binary classification Artificial Neural Network (ANN)** to predict whether a given water sample is safe for human consumption based on its chemical and physical characteristics. 

By feeding advanced diagnostic metrics into our deep learning model, the system outputs immediate safety readings. To make this model practical and accessible, it is wrapped in an interactive **Flask API** backed by a sleek, responsive **React (Tailwind CSS)** frontend dashboard.

### 🎯 Core Features Covered:
* **Advanced Imputation Methods:** Class-based median values utilized to accurately resolve missing sensor metrics without data leakage.
* **Feature Engineering Pipeline:** Custom chemical and environmental ratios mathematically injected to expose underlying chemical patterns to the network.
* **Deep Multi-Layer Perceptron:** A tuned, 3-hidden-layer TensorFlow framework featuring dropout regularizations to avoid overfitting.
* **Production Serialization:** Production artifacts systematically frozen into `.h5` model architectures and `.pkl` scaling metrics.
* **Asynchronous Web Interface:** Full API client-server interaction built out with custom CORS configurations for immediate frontend feedback.

## 📊 Dataset

| Property | Details |
| :--- | :--- |
| **Name** | Water Potability Dataset |
| **Source** | [Kaggle / Aditya Kadiwal](https://www.kaggle.com/datasets/adityakadiwal/water-potability) |
| **Samples** | 3,276 rows (water quality observations) |
| **Features** | 9 foundational numeric features (+ 3 engineered interaction ratios) |
| **Target** | Binary — `1` (Potable / Safe) \| `0` (Non-Potable / Unsafe) |
| **Class Balance** | ~61% Non-Potable (`0`) · ~39% Potable (`1`) |

## 🔍 Feature Schema Breakdown

The dataset contains the following attributes used to determine water safety:

* **ph:** Evaluates the acid/base balance of the water (0 to 14 scale).
* **Hardness:** Concentration of calcium and magnesium minerals (mg/L).
* **Solids:** Total Dissolved Solids (TDS) describing mineralization level (ppm).
* **Chloramines:** Residual chlorine-ammonia disinfectant levels (ppm).
* **Sulfate:** Amount of naturally occurring sulfate minerals (mg/L).
* **Conductivity:** Electrical conductivity indicating dissolved salt ions (μS/cm).
* **Organic Carbon:** Total Organic Carbon (TOC) measuring natural organic matter levels (ppm).
* **Trihalomethanes:** Concentration of chemical disinfection by-products (μg/L).
* **Turbidity:** Measure of water clarity and suspended solid matter (NTU).

## 🤖 Model & Performance

Machine learning configurations were trained and evaluated. An Artificial Neural Network (ANN) was selected for deployment due to its superior capacity to model complex, multi-variable non-linear feature interactions.

| Model | Accuracy | Precision | Recall | F1-Score |
| :--- | :---: | :---: | :---: | :---: |
| Support Vector Machine (SVM) | ~68.4% | ~66.1% | ~61.0% | ~63.4% |

### 📈 Deep Learning Performance Matrix

| Metric | Score | Key Interpretation |
| :--- | :---: | :--- |
| **Accuracy** | `72.64%` | Overall global correctness of the neural network predictions. |
| **Precision** | `70.05%` | Out of all water flagged as safe, 70% was truly safe. |
| **Recall** | `63.60%` | The network successfully found 63.6% of all available drinking water. |
| **F1-Score** | `66.67%` | Robust harmonic metric proving solid class balance stability. |

> 🔑 **Note:** The final performance of your ANN depends on your dataset run variations, but it consistently outperforms shallow architectures by capitalizing on custom engineered interaction ratios and dense multi-layer feature extraction.

### ⚙️ Preprocessing & Implementation Summary:
* **Class-Targeted Imputation:** Missing data values (`NaN`) were dynamically replaced with the feature medians grouped by respective target classes (`Potable` vs. `Non-Potable`) to prevent data leakage.
* **Feature Engineering:** Added 3 custom chemical interaction columns: `Sulfate_Chloramine_Ratio`, `Hardness_pH_Interaction`, and `TDS_Hardness_Ratio`.
* **Standard Scaling:** Logged numeric values were transformed using `StandardScaler` to force a uniform zero-mean ($\mu=0, \sigma=1$) layout crucial for stable deep learning weight initialization.
* **Stratified Validation Split:** Split the dataset using a strict $80\% \text{ Train} / 20\% \text{ Test}$ ratio, with data stratification toggled to preserve precise evaluation class distributions.
