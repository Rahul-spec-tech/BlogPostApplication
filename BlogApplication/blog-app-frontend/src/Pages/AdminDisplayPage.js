import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './UserDisplayPage.css'; 

const AdminDisplayPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const adminName = localStorage.getItem('adminName');

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/posts/admin/get_all_posts`, {headers: { 'Authorization': `Bearer ${token}` },});
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        }
    };

    const deletePost = async (postId) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/posts/admin/delete_post/${postId}`, {headers: { 'Authorization': `Bearer ${token}` },});
            setPosts(posts.filter(post => post._id !== postId));
            alert('Post deleted successfully');
        } catch (error) {
            console.error('Failed to delete the post:', error);
            alert('Failed to delete the post. Please try again.');
        }
    };

    const editPost = (postId) => {
        navigate(`/admin/edit-post/${postId}`);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="page-container">
            <div className="navbar">
                <div className="navbar-content">
                    <div className="app-name">Admin Panel</div>
                    <div className="greeting">
                        {adminName ? `Hello, ${adminName}` : 'Hello, Admin'}
                    </div>
                    <div className="menu-container">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="posts-container">
                    <h2>All Posts</h2>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="post">
                                <div className="post-header">
                                    <h3>{post.title}</h3>
                                    <div className="post-actions">
                                        <button className="edit-post-button" onClick={() => editPost(post._id)}>Edit</button>
                                        <button className="delete-post-button" onClick={() => deletePost(post._id)}>Delete</button>
                                    </div>
                                </div>
                                <p><strong>Author:</strong> {post.author}</p>
                                <p>{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDisplayPage;
