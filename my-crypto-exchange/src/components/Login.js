import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '', // Change 'email' to 'username'
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:5000/api/login', formData); // Change the URL to match your API route

            if (response.status === 200) {
                navigate('/wallet');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label> {/* Change 'Email' to 'Username' */}
                        <input
                            type="text" // Change 'email' to 'text'
                            id="username" // Change 'email' to 'username'
                            name="username" // Change 'email' to 'username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
