import React from 'react';
import './UserProfile.css';
const UserProfile = ({ user, onClose }) => {
    return(
        <div className="model-overlay">
            <div className="model-content">
                <h2>User Profile</h2>
                <p><strong>UserName:</strong>{user.userName}</p>
                <p><strong>Email:</strong>{user.userEmail}</p>
                <p><strong>Phone Number:</strong>{user.userPhone}</p>
                <p><strong>Location:</strong>{user.userLocation}</p>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};
export default UserProfile;