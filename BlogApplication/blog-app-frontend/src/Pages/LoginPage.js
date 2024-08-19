import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
const LoginForm = () =>{
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', { email: userName, password },  { headers: { 'Content-Type': 'application/json'} });
            console.log('Login Response:', response.data);
            const { token } = response.data;
            const fetchedUserName = response.data.userName;
            console.log(token);
            console.log(fetchedUserName);
            localStorage.setItem('authToken', token);
            //console.log(fetchedUserName);
            navigate('/user-page', { state: { userName: fetchedUserName } });
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    const handleRegister = () =>{
        navigate('/register');
    }

    return (
        <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
          <label>Email:</label>
          <input type="text" value={userName} placeholder="Enter your EmailId" onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>Register</button> 
        </form>
      </div>
    );
};
export default LoginForm;