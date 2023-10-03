import React from 'react';
import { Link } from 'react-router-dom'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to MyCryptoExchange</h1>
        <p>
          MyCryptoExchange is your premier destination for hassle-free cryptocurrency trading. Our platform is designed with both seasoned and novice traders in mind, offering an intuitive interface and essential trading tools. We specialize in the trading of two of the most prominent cryptocurrencies, Bitcoin and Ethereum.
        </p>
        <p>
          Our robust user authentication system ensures the security of your assets and personal information, allowing you to trade with confidence. Stay informed with real-time transaction tracking, making it effortless to review your trading history and monitor your investments.
        </p>
        <Link to="/signup" className="cta-button">Get Started</Link> 
        <p>Already have an account? <Link to="/login">Login</Link></p> 
      </div>
    </div>
  );
};

export default LandingPage;
