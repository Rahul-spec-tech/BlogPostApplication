import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import './UserDisplayPage.css';

const UserDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const userName = location.state?.userName || localStorage.getItem('userName');
    const userId = location.state?.userId || localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert('User ID is missing. Please try logging in again.');
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [userId, navigate]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/users/get_user/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser({
                userName: response.data.userName,
                userEmail: response.data.email,
                userPhone: response.data.phoneNum,
                userLocation: response.data.location
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to fetch user data. Please try again later.');
        }
    };

    const handleProfileClick = () => {
        navigate('/user-profile', {state: { user }});
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleUpdateUserData = () => {
        if (!userId) {
            alert('User ID is missing. Please try logging in again.');
            navigate('/login');
        } else {
            navigate('/update-user', { state: { userId, userName } });
        }
    };

    const createPost = () => {
        navigate('/create-post', {state: { userId, userName}})
    }

    return (
        <div className="user-display-container">
            <div className="menu-container">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleUpdateUserData}>Update</Dropdown.Item>
                        <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="greeting">
                {userName ? `Hello, ${userName}` : 'Hello, User'}
            </div>
            <button type="button" onClick={createPost}>Create new Post</button>
        </div>
    );
};

export default UserDisplayPage;
