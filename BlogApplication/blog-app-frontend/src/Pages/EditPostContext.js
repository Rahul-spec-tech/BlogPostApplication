import React, { createContext, useContext, useState } from 'react';
const EditPostContext = createContext();

export const EditPostProvider = ({ children }) => {
    const [editPostData, setEditPostData] = useState(null);

    return (
        <EditPostContext.Provider value={{ editPostData, setEditPostData }}>
            {children}
        </EditPostContext.Provider>
    );
};

export const useEditPost = () => {
    const context = useContext(EditPostContext);
    if (!context) {
        throw new Error('useEditPost should used in EditPostProvider');
    }
    return context;
};