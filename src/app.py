import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for React

# Load the TensorFlow Lite model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "Skin_Cancer.tflite")

interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Define class labels (FULL NAMES)
CLASS_NAMES = {
    "nv": "Melanocytic nevi", 
    "mel": "Melanoma",
    "bkl":"Benign keratosis-like lesions",
    "bcc": "Basal cell carcinoma",
    "akiec": "Actinic keratoses and intraepithelial carcinoma",
    "vasc": "Vascular lesions",
    "df": "Dermatofibroma"
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400  # Bad Request
        
        file = request.files['file']
        file_name = file.filename  # Get file name
        print(f"📂 Received file: {file_name}")  # Debugging

        img = Image.open(file).convert("RGB").resize((28, 28))  # Ensure RGB mode
        img_array = np.array(img, dtype=np.float32) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0).astype(np.float32)  # Ensure float32 for TFLite

        print(f"🖼️ Image shape before prediction: {img_array.shape}")

        # Set input tensor
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()  # Run inference

        # Get output tensor
        predictions = interpreter.get_tensor(output_details[0]['index'])[0]
        predicted_key = list(CLASS_NAMES.keys())[np.argmax(predictions)]
        predicted_class = CLASS_NAMES[predicted_key]  # Extract Full Name
        confidence = float(np.max(predictions)) * 100  # Convert to percentage

        # Debugging: Print prediction result
        print(f"🔮 File: {file_name} | Predicted Class: {predicted_class}, Confidence: {confidence:.2f}%")

        response_data = {
            "file_name": file_name,
            "prediction": predicted_class,
            "confidence": confidence
        }
        return jsonify(response_data), 200

    except Exception as e:
        print(f"❌ Server Error: {e}")  # Log error
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host="localhost", port=5001, debug=True)