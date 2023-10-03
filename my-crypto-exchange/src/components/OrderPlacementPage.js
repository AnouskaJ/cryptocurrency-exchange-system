import React, { useState, useEffect } from 'react';
import './OrderPlacementPage.css';
import Axios from 'axios';

const currencyPairRates = {
  'BTC-ETH': 16.13,
  'BTC-INR': 2258676.55,
  'ETH-INR': 140055.13,
  'ETH-BTC': 1 / 16.13,
  'INR-BTC': 1 / 2258676.55,
  'INR-ETH': 1 / 140055.13,
};

const OrderPlacementPage = () => {
  const [orderInfo, setOrderInfo] = useState({
    currencyPair: 'BTC-ETH',
    orderType: 'quantity',
    quantity: '',
    price: '',
    paymentMethod: 'creditCard',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    const selectedPair = orderInfo.currencyPair;
    const selectedQuantity = parseFloat(orderInfo.quantity);
    if (!isNaN(selectedQuantity) && selectedPair in currencyPairRates) {
      const pricePerUnit = currencyPairRates[selectedPair];
      const price = pricePerUnit * selectedQuantity;
      setOrderInfo({
        ...orderInfo,
        price: price.toFixed(2),
      });
    }
  }, [orderInfo.currencyPair, orderInfo.quantity]);

  const getQuantityLabel = () => {
    // Extract the first 3 characters of the currency pair
    const currencyCode = orderInfo.currencyPair.substring(0, 3);
    return `Enter ${currencyCode} Value:`;
  };

  const placeOrder = () => {
    const orderData = {
      currencyPair: `${orderInfo.currencyPair}`,
      orderType: orderInfo.orderType,
      amount: parseFloat(orderInfo.quantity),
      price: parseFloat(orderInfo.price),
      paymentMethod: orderInfo.paymentMethod,
    };

    const conversionRate = currencyPairRates[orderInfo.currencyPair];
    const total = orderInfo.quantity * orderInfo.price * conversionRate;

    Axios.post('/place-order', { ...orderData, total })
      .then((response) => {
        if (response.status === 200) {
          alert('Order placed successfully!');
        } else {
          alert('Failed to place the order. Please try again.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="order-placement-page">
      <h2>Order Placement</h2>
      <div className="order-form">
        <div className="form-group">
          <label htmlFor="currencyPair">Currency Pair:</label>
          <select
            id="currencyPair"
            name="currencyPair"
            value={orderInfo.currencyPair}
            onChange={handleInputChange}
          >
            <option value="BTC-ETH">BTC-ETH</option>
            <option value="BTC-INR">BTC-INR</option>
            <option value="ETH-INR">ETH-INR</option>
            <option value="ETH-BTC">ETH-BTC</option>
            <option value="INR-BTC">INR-BTC</option>
            <option value="INR-ETH">INR-ETH</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="orderType">Order Type:</label>
          <select
            id="orderType"
            name="orderType"
            value={orderInfo.orderType}
            onChange={handleInputChange}
          >
            <option value="quantity">Quantity</option>
            <option value="limit">Limit Order</option>
            <option value="market">Market Order</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">{getQuantityLabel()}</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={orderInfo.quantity}
            onChange={handleInputChange}
            min="0"
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (per unit):</label>
          <input
            type="text"
            id="price"
            name="price"
            value={orderInfo.price}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={orderInfo.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
        <button onClick={placeOrder}>Place Order</button>
      </div>
      {/* to add real-time market data and charts*/}
    </div>
  );
};

export default OrderPlacementPage;
