import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
 
    const handleSignUp = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axiosClient.post('/api/Users/signup', {
                email,
                password,
                fullName,
                phone,
                address,
                description,
            });

        } catch (error) {
            console.error('User creation failed:', error);
            setErrorMessage('User creation failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className='login-title'>
                    <h1 className="login-title">Sign Up</h1>
                </div>
                <form className="login-form" onSubmit={handleSignUp}>
                    <div className="login-input-group">
                        <input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                    </div>
            
                    <div className="login-input-group">
                        <input placeholder='FullName' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Phone' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="login-input" />
                    </div>
                    
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="login-button-group">
                        <button type="submit" className="login-button">
                            Sign Up
                        </button>
                    </div>
                    <br />
                    <div className="container">
                        <div className="registration">
                            <Link to="/">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
