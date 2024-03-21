import axiosClient from '../../../api/axiosClient';
import React, { useState } from 'react';
import './../../common/styles/createAccountsByAdmin.css';
import { useNavigate } from 'react-router-dom';


export default function CreateAccounts() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');

    // eslint-disable-next-line no-unused-vars
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
 

    const handleCreateAccount = async (e)=> {
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
            const response = await axiosClient.post('/api/Users/createAccount', {email, password, fullName, phoneNumber, address, description, code});
            console.log(response);
            navigate('/admin');
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
        <div className="create-container">
            <div className="create-box">
               <form className="create-form" >
                    <div>
                        <button type="submit" className="create-button" onClick={handleCreateAccount}> Create Accounts</button>
                    </div>
                   <div className="create-input-group">   
                        <input placeholder='FullName' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="create-input" />
                    </div>
                    <div className="create-input-group">
                        <input placeholder='Phone' type="tel" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} className="create-input" />
                    </div>
                    <div className="create-input-group">
                        <input placeholder='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="create-input" />
                    </div>
                    <div className="create-input-group">
                        <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="create-input" />
                    </div>
                    <div className="create-input-group">
                        <input placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="create-input" />
                    </div>   
                    <div className="create-input-group">
                        <input placeholder='Description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="create-input" />
                    </div>       
                    <div className="create-input-group">
                        <input placeholder='Code' type="text" value={code} onChange={(e) => setCode(e.target.value)} className="create-input" />
                    </div>   
                </form>
            </div>
        </div>
    );
}
