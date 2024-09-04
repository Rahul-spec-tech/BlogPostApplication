import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
const RegisterPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    
    const handleRegister= async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not Match');
            return;
        }
        if(!/^\d{10}$/.test(phoneNum)){
            alert("Please provide 10 digit phone number");
            return;
        }
        try{
            const response = await axios.post(`http://localhost:8080/users/add_user`, {userName, email, phoneNum, location, password}, {headers: { 'Content-Type': 'application/json'}});
            if(response){
                alert('Registed Successfully. Please Login');
                navigate(`/login`);
            }
            else{
                alert('Registration failed. Try again');
            }
        }
        catch(error){
            console.error("Registration Failed:", error.response ? error.response.data : error.message);
            alert('Registration failed. Please Try again');
        }
    };
    const redirectLoginPage=()=>{
        navigate('/login');
    }
    return (
        <div className="login-container">
            <h2>Register Form</h2>
            <form onSubmit={handleRegister} className="login-form">
                <div className="input-group">
                    <label>UserName: </label>
                    <input type="text" placeholder="Enter your UserName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Email: </label>
                    <input type="email" placeholder="Enter your EmailId" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>PhoneNumber: </label>
                    <input type="text" placeholder="Enter your Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Location: </label>
                    <input type="text" placeholder="Enter your Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Password: </label>
                    <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Confirm your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                <button type="button" onClick={redirectLoginPage}>Login</button>
            </form>
        </div>
    );
};
export default RegisterPage;