import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    return (
        <PostContext.Provider value={{ posts, setPosts, editPost, setEditPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext);