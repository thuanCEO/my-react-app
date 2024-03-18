import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import axiosClient from '../../api/axiosClient'; // Import axiosClient for API calls
import logo_website from '../common/img/logo/3.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post('/api/Users/login', { email, password }); 
      console.log('Login successful');
      setErrorMessage('');
   
   //   navigate('/managements');   {/* role managements */}

   //   navigate('/staffs');   {/* role managements */}

     navigate('/admin');   {/* role admin */}
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid email or password'); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='login-title'>
        <img src={logo_website} alt="logo_website" width="200px" height="90px" />
        <br></br>
        <br></br>
        <h1 className="login-title">Login</h1>
        </div>
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
          <div className="container">
              <div className="registration">
              <Link to="/signUp">Đăng ký</Link>
              </div>
            </div>
            <br></br>
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
