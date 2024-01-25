import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate server-side authentication
    if (username.trim() === 'admin' && password.trim() === '123') {
      console.log('Login successful');
      setErrorMessage('');
      // Redirect to the manager page
      navigate('/management');
    } else {
      console.log('Login failed');
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <div className="login-input-group">
            <label className="login-label">Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
          </div>
          <div className="login-input-group">
            <label className="login-label">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
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

