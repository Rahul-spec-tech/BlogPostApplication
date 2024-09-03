import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState('');
    const [cloudinaryReady, setCloudinaryReady] = useState(false);
    const user = location.state?.user;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (window.cloudinary && window.cloudinary.createUploadWidget) {
            setCloudinaryReady(true);
        }else {
            const script = document.createElement('script');
            script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
            script.onload = () => setCloudinaryReady(true);
            script.onerror = () => console.error('Failed to load Cloudinary script');
            document.head.appendChild(script);
        }
    }, []);

    const onClose = () => {
        navigate(`/${userId}/user-page`);
    };

    const handleUpload = () => {
        if (cloudinaryReady) {
            const cloudName = 'dunw7lbin';  
            const uploadPreset = 'dmujcaz5';  
            const folder = 'profile_pic';  
            const uploadWidget = window.cloudinary.createUploadWidget({
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                folder: folder,
                cropping: true,
                showAdvancedOptions: true,
                multiple: false,
                maxImageWidth: 800,
                maxImageHeight: 800,
                maxFileSize: 10000000, 
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('Image uploaded successfully:', result.info.secure_url);
                    setProfilePhoto(result.info.secure_url);
                } else if (error) {
                    console.error('Error uploading image:', error);
                }
            });
            uploadWidget.open();
        } else {
            console.error('Cloudinary is not ready.');
        }
    };

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
                    <div className="profile-photo-placeholder" onClick={handleUpload}>
                        <span className="upload-button">Choose or Upload a Photo</span>
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
