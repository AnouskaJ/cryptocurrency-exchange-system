import { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';

const UserContext = createContext("");

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]); 

  const fetchUserData = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/check_login');
      if (response.status === 200) {
        const data = response.data;
        setUser(data.loggedIn ? data.username : null);
      } else {
        console.error('Failed to check login status');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/user/transactions'); 
      if (response.status === 200) {
        const data = response.data;
        setTransactionHistory(data.transactions);
      } else {
        console.error('Failed to fetch transaction history');
      }
    } catch (error) {
      console.error('An error occurred while fetching transaction history:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchTransactionHistory(); 
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserData, transactionHistory }}> 
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
