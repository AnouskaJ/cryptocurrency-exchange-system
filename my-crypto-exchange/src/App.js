import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import WalletPage from './components/WalletPage';
import OrderPlacementPage from './components/OrderPlacementPage';
import TransactionHistoryPage from './components/TransactionHistoryPage';
import ProfilePage from './components/ProfilePage';

import { useUser } from './components/UserContext';

function App() {
  const { user } = useUser();

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {user ? (
            <>
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/trade" element={<OrderPlacementPage />} />
              <Route path="/history" element={<TransactionHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
            </>
          ) : (
            <>
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/trade" element={<OrderPlacementPage />} />
              <Route path="/history" element={<TransactionHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/wallet" element={<Login />} />
              <Route path="/trade" element={<Login />} />
              <Route path="/history" element={<Login />} />
              <Route path="/profile" element={<Login />} />  */}

            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
