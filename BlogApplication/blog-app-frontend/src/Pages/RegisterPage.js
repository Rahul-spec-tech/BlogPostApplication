import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
const RegisterPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleRegister=async (e)=>{
        
    };
    return (
        <><h2>Register Form</h2><form>
            <div>
                <label>UserName: </label>
                <input type="text" placeholder="Enter your UserName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div>
                <label>Email: </label>
                <input type="email" placeholder="Enter your EmailId" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>PhoneNumber: </label>
                <input type="text" placeholder="Enter your Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />
            </div>
            <div>
                <label>Location: </label>
                <input type="text" placeholder="Enter your Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" placeholder="Confirm your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" onClick={handleRegister}>Register</button>
        </form></>
    );
};
export default RegisterPage;