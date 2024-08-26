import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './UserProfile.css';
const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user=location.state?.user;
    const userId = localStorage.getItem('userId');
    const onClose= () => {
        navigate(`/${userId}/user-page`);
    }
    console.log('User Data', user);
    if(!user){
        return <div>No user found. Try again</div>;
    }
    return(
        <div className="model-content">
            <h2>User Profile</h2>
            <p><strong>UserName:</strong>{user.userName}</p>
            <p><strong>Email:</strong>{user.userEmail}</p>
            <p><strong>Phone Number:</strong>{user.userPhone}</p>
            <p><strong>Location:</strong>{user.userLocation}</p>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};
export default UserProfile;