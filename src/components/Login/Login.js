import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import axiosClient from '../../api/axiosClient'; // Import axiosClient for API calls

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => { // Sử dụng async function để gọi API
    try {
      const response = await axiosClient.post('/api/Users/login', { email, password }); // Gửi yêu cầu đăng nhập với email và password
      console.log('Login successful');
      setErrorMessage('');
      // Redirect to the manager page
      navigate('/management');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid email or password'); // Thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <div className="login-input-group">
            <input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" /> {/* Thay đổi input type thành email */}
            <FaRegUserCircle className="icon" />
          </div>
          <div className="login-input-group">
            <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
            <FaLock className="icon" />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="login-button-group">
            <button type="button" onClick={handleLogin} className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
