import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

export default function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  
  
    const handleSignUp = async (e) => {
      e.preventDefault();
 
    };

    return (
    <div className="login-container">
      <div className="login-box">
        <div className='login-title'>
        <h1 className="login-title">Sign Up</h1>
        </div>
        <form className="login-form">
          <div className="login-input-group">
            <input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" /> 
          </div>
          <div className="login-input-group">
            <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
          </div>
          <div className="login-input-group">
            <input placeholder='Confirm Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
          </div>
          <div className="login-input-group">
            <input placeholder='Address' type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
          </div>
          <div className="login-input-group">
            <input placeholder='Phone' type="number" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
          </div>


          <div className="login-button-group">
            <button type="button" onClick={handleSignUp} className="login-button">
              Sign Up
            </button>
          </div>
          <br></br>
          <div className="container">
              <div className="registration">
              <Link to="/">Login</Link>
              </div>
            </div>
        </form>
        </div>
    </div>  
  
      );


};
