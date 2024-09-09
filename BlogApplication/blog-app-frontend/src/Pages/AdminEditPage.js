import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditPost } from './EditPostContext';

const AdminEditPage = () => {
    const navigate = useNavigate();
    const { postId }= useParams();
    const { post, setPost } = useEditPost(); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8080/posts/get_post/${postId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data) {
                    setTitle(response.data.title || '');
                    setDescription(response.data.description || '');
                    setPost(response.data);
                } else {
                    alert('No data found for this post.');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                alert('Failed to fetch post data. Please try again later.');
            }
        };
        fetchPost();
    }, [postId, setPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No authentication token found. Please log in again.');
            return;
        }
        try {
            await axios.put(`http://localhost:8080/posts/update_post/${postId}`, { title, description }, { headers: { 'Authorization': `Bearer ${token}` } });
            alert('Post Updated Successfully');
            navigate(`/admin/dashboard`);
        } catch (error) {
            console.error('Error updating post:', error);
            if (error.response) {
                alert(`Failed to update post. Server responded with status ${error.response.status}`);
            }
        }
    };

    const closeButton = () => {
        navigate(`/admin/dashboard`);
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
                        <textarea value={description} rows="5" cols="55" onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={closeButton}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditPage;
