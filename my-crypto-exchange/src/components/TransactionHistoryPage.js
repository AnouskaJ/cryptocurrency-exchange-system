import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './TransactionHistoryPage.css';
import { useUser } from './UserContext'; 
const TransactionHistoryPage = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);


  const username = user ? user.username : ''; 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/user/${username}/transactions`); 
        if (response.status === 200) {
          const data = response.data;
          setTransactions(data.transactions);
        } else {
          console.error('Failed to fetch transaction data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTransactions();
  }, [page, perPage, username]);

  return (
    <div className="transaction-history-page">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.price}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={transactions.length < perPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
