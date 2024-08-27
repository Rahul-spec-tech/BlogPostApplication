import React, { useState } from 'react';
import './NewPost.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const CreatePost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const userName = location.state?.userName || 'User';
    const userId = location.state?.userId || localStorage.getItem('userId');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8080/posts/add_post',{ userName, title, description },{ headers: { 'Authorization': `Bearer ${token}`}});
            const postId = response.data.post._id;
            localStorage.setItem('postId', postId);
            alert('Post Created Successfully');
            console.log('Post Data', response.data);
            console.log(postId);
            navigate(`/${userId}/user-page`);
        } catch (error) {
            console.log("Error occurred while creating the post. Try again", error);
            alert('Error occurred while creating the post. Try again');
        }
    };
    const closeButton = () => {
        navigate(`/${userId}/user-page`);
    }
    return (
        <div className="model-overlay">
            <div className="model-content">
                <h1>Create a New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Author:</label>
                        <span>{userName}</span>
                    </div>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="text-area">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button type="submit">Create</button>
                    <button onClick={closeButton}>Close</button>
                </form>
            </div>
        </div>
    );
};
export default CreatePost;
