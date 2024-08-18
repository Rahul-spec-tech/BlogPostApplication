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
        console.log('Submitting:', { email: userName, password });
        try {
            const response = await axios.post('http://localhost:8080/users/login', 
                { email: userName, password }, 
                { headers: { 'Content-Type': 'application/json' } } // Ensure the content type is set
            );
            console.log('Login Successful:', response.data);
            const { token } = response.data;
            console.log('Token:', token);
            localStorage.setItem('authToken', token);
            navigate('/user-page', { state: { userName } });
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    };
    
    // const handleRegister = () =>{
    //     navigate('/register');
    // }
    return (
        <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
          <label>Email:</label>
          <input type="text" value={userName} placeholder="Enter your EmailId" onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div class="input-group">
          <label>Password:</label>
          <input type="password" value={password} placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          {/* <button type="button" onClick={handleRegister}>Register</button> */}
        </form>
      </div>
    );
};
export default LoginForm;