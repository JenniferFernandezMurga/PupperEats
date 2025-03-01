"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import  create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_create_user():

    body = request.get_json()

    if body is None: 
        return jsonify({'msg': 'error'}), 400
    if 'username' is None:
        return jsonify({'msg': 'username not found'}), 400
    if 'email' is None:
        return jsonify({'msg': 'email not found'}), 400
    if 'password' is None:({'msg': 'password not found'}), 400

    new_user = User()
    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.password = body["password"]

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'new user created'}), 201

@api.route('/login', methods=['POST'])
def handle_login():

    body = request.get_json()

    if not body or 'email' not in body or 'password' not in body: 
        return jsonify({'msg': 'missing credentials'}), 400
    
    email= body['email']

    user = User.query.filter_by(email=email).first()

    token = create_access_token(identity=str(user.email))

    user_data = {
        'id': user.id, 
        'username': user.username,
        'email': user.email,
        'password': user.password
    }

    return jsonify({
        'msg': 'login successfull', 
        'token': token,
        'user': user_data
    }), 200

@api.route('/auth', methods=['POST'])
def handle_auth_user():

    body = request.get_json()

    if body is None: 
        return jsonify({'msg': 'error'}), 400    
    if 'id' is None:
        return jsonify({'msg': 'id not found'}), 400
    if 'username' is None:
        return jsonify({'msg': 'username not found'}), 400
    if 'email' is None:
        return jsonify({'msg': 'email not found'}), 400
    if 'password' is None:({'msg': 'password not found'}), 400

    user = User.query.filter_by(
        id = body["id"],
        username = body["username"],
        email = body["email"],
        password = body["password"]
    ).first()
    
    if user is None:
        return jsonify({'msg': 'user not found'}), 401
    
    token = create_access_token(identity= user.email)

    return jsonify({'token': token}), 200 


@api.route('/login', methods=['POST'])
def handle_login():

    body = request.get_json()

    if not body or 'email' not in body or 'password' not in body: 
        return jsonify({'msg': 'missing credentials'}), 400
    
    email= body['email']

    user = User.query.filter_by(email=email).first()

    token = create_access_token(identity=str(user.email))

    user_data = {
        'id': user.id, 
        'username': user.username,
        'email': user.email,
        'password': user.password
    }

    return jsonify({
        'msg': 'login successfull', 
        'token': token,
        'user': user_data
    }), 200







