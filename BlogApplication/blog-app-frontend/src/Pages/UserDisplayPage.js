import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
const UserDisplayPage = () => {
        const location = useLocation();
        const  userName  = location.state?.userName || 'User' ;
        const token = localStorage.getItem('authToken');
        if(!token){
            return <Navigate to="/" />;
        }
    return <h1>Hello, {userName}</h1>
};
export default UserDisplayPage;