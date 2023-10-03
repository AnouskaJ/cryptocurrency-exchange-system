import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'; 
import './WalletPage.css';

const WalletPage = () => {
  const [bitcoinBalance, setBitcoinBalance] = useState(0);
  const [ethereumBalance, setEthereumBalance] = useState(0);

  useEffect(() => {
    const fetchWalletBalances = async () => {
      try {
        const bitcoinResponse = await Axios.get('/api/wallet/bitcoin'); 
        const ethereumResponse = await Axios.get('/api/wallet/ethereum'); 

        if (bitcoinResponse.status === 200) {
          setBitcoinBalance(bitcoinResponse.data.balance);
        }

        if (ethereumResponse.status === 200) {
          setEthereumBalance(ethereumResponse.data.balance);
        }
      } catch (error) {
        console.error('Error fetching wallet balances:', error);
      }
    };

    fetchWalletBalances(); 
  }, []);

  const handleDepositWithdraw = async (currency, amount) => {
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount. Please enter a positive number.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:5000/api/transactions', {
        currency,
        amount,
      }); 

      if (response.status === 200) {
        if (currency === 'bitcoin') {
          setBitcoinBalance(response.data.balance);
        } else if (currency === 'ethereum') {
          setEthereumBalance(response.data.balance);
        }
      } else {
        console.error('Transaction failed:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="wallet-page">
      <div className="wallet-section bitcoin-section">
        <h2>Bitcoin Wallet</h2>
        <div className="balance">
          <p>Bitcoin Balance: {bitcoinBalance} BTC</p>
        </div>
        <div className="actions">
          <button onClick={() => handleDepositWithdraw('bitcoin', 10)}>Deposit Bitcoin</button>
          <button onClick={() => handleDepositWithdraw('bitcoin', -5)}>Withdraw Bitcoin</button>
        </div>
      </div>
      <div className="wallet-section ethereum-section">
        <h2>Ethereum Wallet</h2>
        <div className="balance">
          <p>Ethereum Balance: {ethereumBalance} ETH</p>
        </div>
        <div className="actions">
          <button onClick={() => handleDepositWithdraw('ethereum', 5)}>Deposit Ethereum</button>
          <button onClick={() => handleDepositWithdraw('ethereum', -2)}>Withdraw Ethereum</button>
        </div>
      </div>
      <Link to="/order-placement" className="cta-button">
        Place an Order
      </Link>
    </div>
  );
};

export default WalletPage;
