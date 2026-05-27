import React, { useState } from "react";
import { cn } from "../src/App";

export const FormData = () => {
  // 1. Updated state to accurately reflect the 9 water quality features
  const [forms, setForms] = useState({
    ph: "",
    hardness: "",
    solids: "",
    chloramines: "",
    sulfate: "",
    conductivity: "",
    organicCarbon: "",
    trihalomethanes: "",
    turbidity: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Dynamic Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Form Submission Handler to send data to Flask
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forms),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPrediction(data.prediction); // Expecting { prediction: "..." } from Flask
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  // Helper array for rendering inputs quickly and accurately
  const inputFields = [
    { label: "PH", name: "ph", placeholder: "Value from 0-14" },
    { label: "Hardness", name: "hardness", placeholder: "mg/L" },
    { label: "Solids", name: "solids", placeholder: "ppm" },
    { label: "Chloramines", name: "chloramines", placeholder: "ppm" },
    { label: "Sulfate", name: "sulfate", placeholder: "mg/L" },
    { label: "Conductivity", name: "conductivity", placeholder: "μS/cm" },
    { label: "Organic Carbon", name: "organicCarbon", placeholder: "ppm" },
    { label: "Trihalomethanes", name: "trihalomethanes", placeholder: "μ/L" },
    { label: "Turbidity", name: "turbidity", placeholder: "NTU" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 max-w-2xl mx-auto bg-linear-to-b from-cyan-50 via-blue-50 to-cyan-50 shadow-xl rounded-2xl p-8"
    >
      <div className="text-center h-14 text-transparent text-4xl bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text font-bold">
        Input your{" "}
        <span
          className={cn(
            "inline-block relative z-10 text-white px-2",
            "after:content-[''] after:absolute after:inset-0 after:bg-red-500 after:-z-10 after:rotate-6 after:skew-x-12 after:rounded-md hover:after:rotate-0 transition-all duration-300"
          )}
        >
          Attributes
        </span>{" "}
        below
      </div>

      <div className="my-4 flex flex-col justify-start max-w-sm mx-auto gap-1">
        {inputFields.map((field) => (
          <React.Fragment key={field.name}>
            <label
              className="after:content-['*'] after:text-red-400 text-neutral-600 font-medium mt-4 first:mt-0"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <input
              required
              id={field.name}
              name={field.name}
              value={forms[field.name]}
              onChange={handleChange}
              className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-md px-4 py-2 rounded-lg bg-gray-100 text-black"
              placeholder={field.placeholder}
              type="number"
              step="any"
            />
          </React.Fragment>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="mx-auto p-2 px-6 rounded-lg mt-6 font-medium text-xl bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Submit"}
        </button>

        {/* Display prediction result if it exists */}
        {prediction !== null && (
          <div className="mt-6 p-4 bg-white/80 rounded-xl text-center border border-blue-200">
            <h3 className="text-lg font-semibold text-neutral-700">Prediction Result:</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{prediction}</p>
          </div>
        )}
      </div>
    </form>
  );
};