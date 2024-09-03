import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { usePosts } from './PostContext';
import './UserDisplayPage.css';

const UserDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { posts, setPosts } = usePosts();
    const userName = location.state?.userName || localStorage.getItem('userName');
    const userId = location.state?.userId || localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert('User ID is missing. Please try logging in again.');
            navigate('/login');
        } else {
            fetchUserData();
            fetchPosts();
        }
    }, [userId, navigate]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/users/get_user/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
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

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/posts/get_posts`, { headers: { 'Authorization': `Bearer ${token}` } });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        }
    };

    const editPost = (postId) => {
        navigate(`/${userId}/edit-post/${postId}`);
    };

    const deletePost = async (postId) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/posts/delete_post/${postId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setPosts(posts.filter(post => post._id !== postId));
            alert('Post deleted successfully');
        } catch (error) {
            console.error('Failed to delete the post:', error);
            alert('Failed to delete the post. Please try again.');
        }
    };

    const handleProfileClick = () => {
        navigate(`/${userId}/user-profile`, { state: { user, userId } });
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
            navigate(`/${userId}/update-user`, { state: { user, userId } });
        }
    };

    const createPost = () => {
        navigate(`/${userId}/create-post`, { state: { userId, userName } });
    };

    return (
        <div>
            <div className="navbar">
                <div className="app-name">Blog App</div>
                <div className="menu-container">
                    <button onClick={createPost} className="create-post-button">Create Post</button>
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
            </div>
            <div className="user-display-container">
                <div className="greeting">
                    {userName ? `Hello, ${userName}` : 'Hello, User'}
                </div>
                <div className="posts-container">
                    <h2>Blog Posts</h2>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="post">
                                <div className="post-header">
                                    <h3>{post.title}</h3>
                                    {post.author === userName && (
                                        <div className="post-actions">
                                            <button className="edit-post-button" onClick={() => editPost(post._id)}>Edit</button>
                                            <button className="delete-post-button" onClick={() => deletePost(post._id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                                <p><strong>Author:</strong> {post.author}</p>
                                <p>{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Posts Available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDisplayPage;
