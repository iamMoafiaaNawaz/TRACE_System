from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import jwt
import datetime
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Setup
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/trace_db")
client = MongoClient(mongo_uri)
db = client.get_database()
users_collection = db["users"]

SECRET_KEY = os.getenv("SECRET_KEY", "secret")

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "TRACE Backend is Running!"})

# --- SIGNUP ---
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        if not data.get('email') or not data.get('password') or not data.get('fullName'):
            return jsonify({"error": "Missing fields"}), 400

        if users_collection.find_one({"email": data['email']}):
            return jsonify({"error": "User already exists"}), 400

        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        new_user = {
            "fullName": data['fullName'],
            "email": data['email'],
            "password": hashed_password,
            "role": data.get('role', 'Student'),
            "created_at": datetime.datetime.utcnow()
        }
        users_collection.insert_one(new_user)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- LOGIN ---
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Missing email or password"}), 400

        user = users_collection.find_one({"email": data['email']})
        if not user:
            return jsonify({"error": "User not found"}), 404

        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            token = jwt.encode({
                'user_id': str(user['_id']),
                'role': user['role'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, SECRET_KEY, algorithm="HS256")

            return jsonify({
                "message": "Login Successful",
                "token": token,
                "user": {
                    "fullName": user['fullName'],
                    "email": user['email'],
                    "role": user['role']
                }
            }), 200
        else:
            return jsonify({"error": "Invalid Password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)