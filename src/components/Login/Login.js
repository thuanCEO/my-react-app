import React, { useState } from 'react';
import './../common/styles/Login.css';
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
    
      const userData = response.data;
      console.log('User data:', userData); // Log user data to check the structure
      
      // Extract and store user data in session storage
      const { role, fullname, gemail } = userData;
      sessionStorage.setItem('userData', JSON.stringify(userData)); 
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('fullname', fullname);
      sessionStorage.setItem('gemail', gemail);

       if(role === 1) //role 1= admin
      {
        navigate('/admin'); 
      }
      if(role === 2){ // role 2 = managements
        navigate('/managements');
      }
      if(role === 3) //role 3 = staff
      {
        navigate('/staffs');
      }
     
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
