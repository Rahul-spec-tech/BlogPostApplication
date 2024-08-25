import React from 'react';
import {useNavigate} from 'react-router-dom';
const NavBar = ({ onLogout, handleProfileClick }) => {
    const navigate = useNavigate();
    // const handleProfileClick = () => {
    //     navigate('/user-profile');
    // };
    // const handleLogOutClick = () => {
    //     onLogout();
    // };
    return(
        <nav className="navbar">
            <button onClick={handleProfileClick} className="navbar-button">Profile</button>
            <button onClick={onLogout} className="navbar-button">Logout</button>
        </nav>
    );
};
export default NavBar;