import React, {useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

const UserDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.userName || localStorage.getItem('userName');
    const userId = location.state?.userId || localStorage.getItem('userId');
    //const token = localStorage.getItem('authToken');
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    useEffect(() => {
        // const storedUserId = localStorage.getItem('userId');
        // const storedUserName = localStorage.getItem('UserName');
        if(!userId) {
            //console.log('UserId is not found from localStorage');
            alert('User Id is missing. Please try logging again');
            navigate('/');
        }
        // else{
        //     console.log('User Id exists:', userId);
        // }
    }, [userId, navigate]);

    const handleUpdateUserData = () => {
        if(!userId){
            alert('User Id is missing. Please try logging in');
            navigate('/');
        }
        else{
            navigate('/update-user', { state: { userId, userName} });
            //console.log('Navigating with User ID:', userId);
        }
        // console.log('User ID:', userId);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        navigate('/');
    };
    return (
        <div className="user-display-container">
            <h1>Hello, {userName}!</h1>
            {/* <p>Your User ID is: {userId}</p> */}
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={handleUpdateUserData}>Update User</button>
        </div>
    );
};

export default UserDisplayPage;
