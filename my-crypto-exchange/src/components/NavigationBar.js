// NavigationBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/wallet" activeClassName="active">Wallet</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/trade" activeClassName="active">Trade</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/history" activeClassName="active">History</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
