import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Pages/LoginPage';
import UserDisplayPage from  './Pages/UserDisplayPage';
import ProtectedRoute from './Pages/ProtectedRoute';
import RegisterPage from './Pages/RegisterPage';
import UpdateForm from './Pages/UpdateForm';
import UserProfile from './Pages/UserProfile';
import CreatePost from './Pages/NewPost';

function NotFound(){
  return <h1>404-Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/:userId/user-page" element={<ProtectedRoute><UserDisplayPage /></ProtectedRoute> } />
        <Route path="/:userId/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:userId/update-user" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
        <Route path="/:userId/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        {/* <Route path="/update-user" element={<UpdateForm />} /> */}
        <Route path ="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;


