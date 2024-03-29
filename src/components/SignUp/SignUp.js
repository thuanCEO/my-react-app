import React, { useState } from 'react';
import './../common/styles/SignUp.css';
import { Link,useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]).{6,}$/;
        return passwordRegex.test(password);
    };
    const isPhoneNumberValid = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };
 

    const handleSignUp = async (e)=> {
        e.preventDefault();
        if (!isPasswordValid(password)) {
            setErrorMessage('Password must contain at least 6 characters, including one uppercase letter and one special character.');
            return;
        }
        if (!isPhoneNumberValid(phoneNumber)) {
            setErrorMessage('Phone number must be 10 digits.');
            return;
        }
        if (!email || !password || !fullName || !phoneNumber || !address) {
            setErrorMessage('Please fill in all fields.');  
            return;
        }
        try {
            const response = await axiosClient.post('/api/Users/signup', {email, password, fullName, phoneNumber, address});
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error('User creation failed:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('User creation failed. Please try again.');
            }
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
                        <input placeholder='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                    </div>
            
                    <div className="login-input-group">
                        <input placeholder='FullName' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Phone' type="tel" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} className="login-input" />
                    </div>
                    <div className="login-input-group">
                        <input placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="login-input" />
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
