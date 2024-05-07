import joblib  
from flask import Flask, request, jsonify
import jwt  # for creating and decoding JWT tokens
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy database for user storage (replace with actual database)
users = {}

# Load serialized model and vectorizer
#os.path.join(folder, 'data_memmap')model = joblib.load('/path/to/svm-model-1.pkl') 
import joblib
model = joblib.load('C:/Users/adame/OneDrive/Documents/CTP_Class/ai_teacher/ai_model/model.pkl')

vectorizer = joblib.load('C:/Users/adame/OneDrive/Documents/CTP_Class/ai_teacher/ai_model/vectorizer.pkl')

# Secret key for JWT token encoding (change this to a secure random key in production)
app.config['SECRET_KEY'] = 'your-secret-key'

# Define route for user registration
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data["email"]
        password = data["password"]

        # Check if email already exists
        if email in users:
            return jsonify({"error": "Email already registered"}), 400

        # Store user data (replace with actual database operation)
        users[email] = {"email": email, "password": password}

        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Define route for user login
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data["email"]
        password = data["password"]

        # Check if user exists and password matches
        if email not in users or users[email]["password"] != password:
            return jsonify({"error": "Invalid email or password"}), 401

        # Create JWT token with user email as payload
        token = jwt.encode({"email": email}, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({"message": "Login successful", "token": token.decode('utf-8')}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Define route for article prediction
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print(data)
        text = data["title"]
        text2 = data["description"]
        print(text)
        print(text2)

        # Preprocess text using vectorizer
        text_vectorized = vectorizer.transform([text + text2])

        # Make prediction using model
        prediction = model.predict(text_vectorized)
        print(prediction)

        return jsonify({"prediction": prediction[0]}), 200
    except Exception as e:
        print()
        return jsonify({"error": str(e)}), 500
    
@app.route("/", methods=["GET"])
def testing():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True)
