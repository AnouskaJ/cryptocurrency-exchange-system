from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import session
import datetime

from flask_cors import CORS
app = Flask(__name__)
app.secret_key = 'mysecretkey' 
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://backend:backend@localhost/cryptocurrency'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    username = db.Column(db.String(100), unique=True, primary_key=True, nullable=False)
    id = db.Column(db.Integer, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    firstName = db.Column(db.String(100)) 
    lastName = db.Column(db.String(100))   

    transactions = db.relationship('Transaction', back_populates='user')

    def __init__(self, username, email, password, firstName=None, lastName=None):
        self.username = username
        self.email = email
        self.password = Bcrypt().generate_password_hash(password).decode('utf-8')
        self.firstName = firstName
        self.lastName = lastName


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), db.ForeignKey('user.username'), primary_key=True)
    date = db.Column(db.Date)
    type = db.Column(db.String(20))
    amount = db.Column(db.Float)
    price = db.Column(db.Float)
    status = db.Column(db.String(20))
    user = db.relationship('User', back_populates='transactions')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({'message': 'Username already taken'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'message': 'Email already in use'}), 400

    new_user = User(username=data['username'], email=data['email'], password=data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200


transaction_history_api = Blueprint('transaction_history_api', __name__)

@transaction_history_api.route('/api/user/<username>/transactions', methods=['GET'])
def get_user_transactions(username):
    try:
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        transactions = Transaction.query.filter_by(user_id=user.id).all()
        transaction_data = [{'id': transaction.id, 'date': transaction.date, 'type': transaction.type, 'amount': transaction.amount, 'price': transaction.price, 'status': transaction.status} for transaction in transactions]

        return jsonify({'transactions': transaction_data})
    except Exception as e:
        return jsonify({'error': 'An error occurred'}), 500
    
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data['username']).first()

    if user and Bcrypt().check_password_hash(user.password, data['password']):
        session['username'] = user.username
        user.firstName = user.firstName if user.firstName else ""
        user.lastName = user.lastName if user.lastName else ""
        return jsonify({'username': user.username}), 200
    else:
        return jsonify({'message': 'Login failed'}), 401

@app.route('/check_login', methods=['GET'])
def check_login():
    if 'username' in session:
        return jsonify({'loggedIn': True, 'username': session['username']}), 200
    else:
        return jsonify({'loggedIn': False}), 401
    
@app.route('/place-order', methods=['POST'])
def place_order():
    data = request.get_json()
    username = session.get('username')
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    new_transaction = Transaction(
        user_id=user.id,
        username=user.username,
        date=datetime.datetime.now(),  
        type=data['orderType'],
        amount=data['amount'],
        price=data['price'],
        status='completed', 
        currency_pair=data['currencyPair'],  
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({'message': 'Order placed successfully'}), 200

@app.route('/api/update-user-profile', methods=['PUT'])
def update_user_profile():
    data = request.get_json()

    user = User.query.filter_by(username=session['username']).first()

    if user:
        user.firstName = data.get('firstName', user.firstName)
        user.lastName = data.get('lastName', user.lastName)
        db.session.commit()
        return jsonify({'message': 'User profile updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

user_profile_api = Blueprint('user_profile_api', __name__)

@user_profile_api.route('/api/user-profile', methods=['GET'])
def get_user_profile():
    username = session.get('username') 

    if username:
        user = User.query.filter_by(username=username).first()

        if user:
            return jsonify({
                'username': user.username,
                'email': user.email,
                'firstName': user.firstName,
                'lastName': user.lastName,
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Authentication required'}), 401

app.register_blueprint(user_profile_api)

    
if __name__ == '__main__':
    app.run()
