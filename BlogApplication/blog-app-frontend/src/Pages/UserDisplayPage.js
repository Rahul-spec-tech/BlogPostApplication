import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const UserDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName  = location.state?.userName || 'User' ;
    const token = localStorage.getItem('authToken');
    const handleLogout = () =>{
        localStorage.removeItem('authToken');
        navigate('/');
    }
    console.log('UserDisplayPage:', userName);
        if(!token){
            return <Navigate to="/" />;
        }
    return(
        <div>
            <h1>Hello, {userName}</h1>
            <button onClick={handleLogout}>LogOut</button> 
        </div>
    )
};
export default UserDisplayPage;