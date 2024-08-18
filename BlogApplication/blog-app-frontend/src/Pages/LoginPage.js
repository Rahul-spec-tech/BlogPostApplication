import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () =>{
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Submit:', {email: userName, password});
        try{
            const response = await axios.post('http://localhost:8080/users/login', { email: userName, password }, {headers: { 'Content-Type': 'application/json'}});
            console.log('Login Successful:', response.data);
            const { token } = response.data;
            console.log('Token:', token);
            localStorage.setItem('authToken', token);
            navigate('/user-page', { state: { userName } });
        }
        catch (error){
            if(error.response){
                console.error('Login failed',error.response.data);
                alert('Login failed. Please check your credentials and try again.');
            }
            else{
                console.error('Login failed:', error.message);
                alert('Login failed. Please check your credentials and try again.');
            }
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />

                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginForm;