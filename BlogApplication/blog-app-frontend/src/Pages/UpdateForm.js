import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //const storedUser = JSON.parse(localStorage.getItem('userFormData'));

    const [userName, setUserName] = useState(location.state?.userName);
    const [phoneNum, setPhoneNum] = useState('');
    const [locationData, setLocationData] = useState('');
    const [password, setPassword] = useState('');

    const userId = localStorage.getItem('userId');
    console.log(userId);
    useEffect(() => {
        if (!userId) {
            //console.log('UserId is undefined');
            //userId = localStorage.getItem('userId');
            alert('User ID is missing. Please try logging in again.');
            navigate('/login'); 
        }
        // else{
        //     console.log('Received User ID:', userId);
        // }
    }, [userId, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('User ID is missing. Update cannot proceed');
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            console.log('Sending Data:', {
                userName, phoneNum, locationData, password
            });
            const response = await axios.put(`http://localhost:8080/users/update_user/${userId}`,{ userName, phoneNum, locationData, password },{headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
            console.log('Updated Response:', response.data);
            alert('Data updated successfully');
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Update failed. Please try again later.';
            alert(errorMessage);
            console.error('Update failed:', errorMessage);
        }
    };

    const redirectUserPage=()=>{
        navigate('/');
    }
    
    return (
        <div className="login-container">
            <h2>Update Form</h2>
            <form onSubmit={handleUpdate} className="login-form">
                <div className="input-group">
                    <label>UserName:</label>
                    <input type="text" value={userName} placeholder="Enter your UserName" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>PhoneNum:</label>
                    <input type="text" value={phoneNum} placeholder="Enter your Phone Number" onChange={(e) => setPhoneNum(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input type="text" value={locationData} placeholder="Enter your Location" onChange={(e) => setLocationData(e.target.value)} required/>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"/>
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={redirectUserPage}>Close</button>
            </form>
        </div>
    );
};
export default UpdateForm;
