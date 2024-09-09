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
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.token) {
                const { userName, userId, role } = response.data;
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userId', userId);
                if(role === 'admin'){
                    navigate('/admin/dashboard');
                }
                else{
                    navigate(`/${userId}/user-page`, { state: { userName, userId } });
                }
            } else {
                alert('Login failed. Try again');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Login failed. Please check your credentials and try again.';
            console.error('Login failed:', errorMsg);
            alert(errorMsg);
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
                    <input type="email" name="email" value={email} placeholder="Enter your Email ID" onChange={(e) => setEmail(e.target.value)} required autoComplete="email"/>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"/>
                </div>
                <button type="submit" className="login-button">Login</button>
                <button type="button" onClick={handleRegister} className="register-button">Register</button> 
            </form>
        </div>
    );
};

export default LoginForm;
