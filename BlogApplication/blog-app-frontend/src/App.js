import React from 'react';
import {jwtDecode}  from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Pages/LoginPage';
import UserDisplayPage from  './Pages/UserDisplayPage';
import ProtectedRoute from './Pages/ProtectedRoute';
import RegisterPage from './Pages/RegisterPage';
import UpdateForm from './Pages/UpdateForm';
import UserProfile from './Pages/UserProfile';
import CreatePost from './Pages/NewPost';
import EditPost from './Pages/EditPost';

function NotFound(){
  return <h1>404-Not Found</h1>;
}

function decodeToken(token) {
  try {
      return jwtDecode(token);
  } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
  }
}

function App() {
  const authToken = localStorage.getItem('authToken');
  const decodedToken = authToken ? decodeToken(authToken) : null;
  const userId = decodedToken ? decodedToken._id : null;
  if (!userId) {
    console.log('UserId is undefined or token is invalid');
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Navigate to={`/${userId}/user-page`} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/:userId/user-page" element={<ProtectedRoute><UserDisplayPage /></ProtectedRoute> } />
        <Route path="/:userId/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:userId/update-user" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
        <Route path="/:userId/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/:userId/edit-post/:postId" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        {/* <Route path="/update-user" element={<UpdateForm />} /> */}
        <Route path ="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;


