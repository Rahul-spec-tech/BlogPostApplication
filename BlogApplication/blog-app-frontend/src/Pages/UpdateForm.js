import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user || {};
    const [userName, setUserName] = useState(user.userName || '');
    const [phoneNum, setPhoneNum] = useState(user.userPhone || '');
    const [locationData, setLocationData] = useState(user.userLocation || '');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert('User ID is missing. Please try logging in again.');
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleFileUpdate = (e) => {
        setProfilePhoto(e.target.files[0]); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('User ID is missing. Update cannot proceed');
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();
            if (profilePhoto) {
                formData.append('profilePhoto', profilePhoto);
                const uploadResponse = await axios.post('http://localhost:8080/users/upload_photo', formData,{ headers:{'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}`}});
                const profilePhotoUrl = uploadResponse.data.url;
                const updateData = {userName, phoneNum, location: locationData, profilePhoto: profilePhotoUrl,};
                if (password) {
                    updateData.password = password;
                }
                await axios.put(`http://localhost:8080/users/update_user/${userId}`, updateData, { headers: { 'Authorization': `Bearer ${token}` }});
                alert('User updated successfully');
                navigate('/login');
            } 
            else {
                const updateData = { userName, phoneNum, location: locationData };
                if (password) {
                    updateData.password = password;
                }
                const response = await axios.put(`http://localhost:8080/users/update_user/${userId}`, updateData, { headers: { 'Authorization': `Bearer ${token}` }});
                console.log('Updated Response:', response.data);
                alert('Data updated successfully');
                navigate('/login');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Update failed. Please try again later.';
            alert(errorMessage);
            console.error('Update failed:', errorMessage);
        }
    };

    const redirectUserPage = () => {
        navigate(`/${userId}/user-page`);
    };
    return (
        <div className="login-container">
            <h2>Update Form</h2>
            <form onSubmit={handleUpdate} className="login-form" encType="multipart/form-data">
                <div className="input-group">
                    <label>UserName:</label>
                    <input type="text" value={userName} placeholder="Enter your UserName" onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input type="text" value={phoneNum} placeholder="Enter your Phone Number" onChange={(e) => setPhoneNum(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input type="text" value={locationData} placeholder="Enter your Location" onChange={(e) => setLocationData(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                </div>
                <div className="input-group">
                    <label>Profile Photo:</label>
                    <input type="file" onChange={handleFileUpdate} />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={redirectUserPage}>Close</button>
            </form>
        </div>
    );
};
export default UpdateForm;
