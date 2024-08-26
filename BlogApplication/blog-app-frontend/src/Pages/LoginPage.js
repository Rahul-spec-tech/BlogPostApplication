import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
const LoginForm = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login',
                { email: email, password: password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Login Response:', response.data);
            if (response.data.token) {
                const { userName, userId } = response.data;
                // console.log('User Id1:', userId);
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userId', userId);
                // console.log("User ID2:", userId);
                console.log('Login Response:', response.data);
                navigate('/', { state: { userName, userId } });
            } else {
                alert('Login failed. Try again');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} placeholder="Enter your EmailId" onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegister}>Register</button> 
            </form>
        </div>
    );
};
export default LoginForm;
