import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const postId = location.state?.postId || localStorage.getItem('postId');
    const userId = location.state?.userId || localStorage.getItem('userId');

    useEffect(() => {
        if (postId) {
            fetchPostData();
        }
    }, [postId]);

    const fetchPostData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No authentication token found. Please log in again.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/posts/get_post/${postId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTitle(response.data.title);
            setDescription(response.data.description);
        } catch (error) {
            console.error('Error fetching post data:', error.response?.data || error.message);
            alert('Failed to fetch post data. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No authentication token found. Please log in again.');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8080/posts/update_post/${postId}`, { title, description }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Post Updated Successfully');
            navigate(`/${userId}/user-page`);
        } catch (error) {
            console.error('Error updating post:', error);
            if (error.response) {
                alert(`Failed to update post. Server responded with status ${error.response.status}`);
            } else if (error.request) {
                alert('Failed to update post. No response from server.');
            } else {
                alert(`Failed to update post. ${error.message}`);
            }
        }
    };

    const closeButton = () => {
        navigate(`/${userId}/user-page`);
    };

    return (
        <div className="model-overlay">
            <div className="model-content">
                <h1>Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="text-area">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={closeButton}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;
