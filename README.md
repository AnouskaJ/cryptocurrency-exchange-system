# Cryptocurrency Exchange Platform

## Table of Contents

1. [Abstract](#abstract)
2. [Solution](#solution)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Getting Started](#getting-started)
6. [Bitcoin Price Prediction Model](#bitcoin-price-prediction-model)

## Abstract

The Cryptocurrency Exchange Platform project is aimed at developing a web-based platform that facilitates cryptocurrency trading. This platform offers essential trading functionalities, user authentication, and transaction tracking, enabling users to seamlessly exchange cryptocurrencies.

## Solution

### User Registration and Authentication

- Users can create accounts with unique credentials, ensuring a secure registration process.
- The platform employs a robust and secure authentication mechanism to safeguard user data and privacy.

### Wallet Integration

- Each user is provided with cryptocurrency wallets for trading, offering a secure and convenient way to manage their assets.
- Basic deposit and withdrawal features are implemented to enable users to manage their cryptocurrency holdings effectively.

### Trading Pairs

- The platform supports a selected trading pair with real-time exchange rates, ensuring users can make informed trading decisions.
- A user-friendly interface simplifies the process of placing market orders, making trading accessible to all users.

### Order Placement and Execution

- Users can place buy/sell orders for the chosen trading pair, allowing them to take advantage of market opportunities.
- Trades are executed automatically upon matching orders, ensuring quick and efficient transactions.

### Transaction History

- Users have access to their recent transaction history, including executed trades and timestamps. This feature helps users track their trading activity and monitor their investments.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: Python (Flask)
- **Database**: PostgreSQL

## Installation

1. Clone the repository to your local machine.

```shell
git clone https://github.com/AnouskaJ/cryptocurrency-exchange-system
```

2. Install the necessary dependencies for the frontend and backend components.

For the frontend:

```shell
cd frontend
npm install
```

For the backend:

```shell
cd backend
pip install -r requirements.txt
```

3. Set up the PostgreSQL database and configure the connection in the backend.

4. Initialize the database schema and populate it with sample data if needed.

## Getting Started

- Run the frontend and backend servers.
- Access the platform through your web browser using the provided URL.

## Bitcoin Price Prediction Model

The project also includes a Bitcoin price prediction model using Long Short-Term Memory (LSTM) from TensorFlow. This model aims to forecast future Bitcoin prices based on historical data. Instructions for using and training the model can be found in the model's README.
