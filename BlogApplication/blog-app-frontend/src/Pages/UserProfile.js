import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;                     
    const userId = localStorage.getItem('userId');
    const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');

    const onClose = () => {
        navigate(`/${userId}/user-page`);
    };

    useEffect(() => {
        if (user?.profilePhoto) {
            setProfilePhoto(user.profilePhoto);
        }
    }, [user]);

    if (!user) {
        return <div>No user found. Try again</div>;
    }

    return (
        <div className="model-content">
            <h2>User Profile</h2>
            <div className="profile-photo-container">
                {profilePhoto ? (
                    <div className="profile-photo">
                        <img src={profilePhoto} alt="Profile" />
                    </div>
                ) : (
                    <div className="profile-photo-placeholder">
                        <span className="upload-button">No Photo Available</span>
                    </div>
                )}
            </div>
            <p><strong>UserName:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.userEmail}</p>
            <p><strong>Phone Number:</strong> {user.userPhone}</p>
            <p><strong>Location:</strong> {user.userLocation}</p>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default UserProfile;
