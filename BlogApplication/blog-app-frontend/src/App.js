import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/LoginPage';
import UserDisplayPage from  './Pages/UserDisplayPage';
import ProtectedRoute from './Pages/ProtectedRoute';
import RegisterPage from './Pages/RegisterPage';
import UpdateForm from './Pages/UpdateForm';

function NotFound(){
  return <h1>404-Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user-page" element={<ProtectedRoute><UserDisplayPage /></ProtectedRoute> } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/update-user" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
        {/* <Route path="/update-user" element={<UpdateForm />} /> */}
        <Route path ="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;


