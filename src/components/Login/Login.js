// src/components/Login/Login.js - PROFESSIONAL VERSION
import React, { useState } from 'react';
import './Login.css';

// Import icons (you'll need to install react-icons: npm install react-icons)
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContinue = (e) => {
        e.preventDefault();
        console.log('Continue with email:', email);
    };

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="close-btn" onClick={onClose} aria-label="Close">
                    ×
                </button>

                {/* Header - EXACT from screenshot */}
                <div className="login-header">
                    <h1 className="login-title">Log in or create an account</h1>
                </div>

                {/* Form Section */}
                <div className="login-form-section">
                    <form onSubmit={handleContinue}>
                        {/* Email Field with Label inside box */}
                        <div className="email-field">
                            <div className="email-label-row">
                                <span className="email-label">Email address</span>
                                <span className="required-text">required</span>
                            </div>
                            
                            <div className="email-input-wrapper">
                                <label className="input-label">Enter your email</label>
                                <input
                                    type="email"
                                    className="email-input"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Continue Button - Professional Blue */}
                        <button type="submit" className="continue-btn">
                            Continue
                        </button>
                    </form>

                    {/* Divider - Light Gray */}
                    <div className="divider">
                        <span>or</span>
                    </div>

                    {/* Social Buttons with Icons */}
                    <div className="social-buttons">
                        {/* <button 
                            type="button"
                            className="social-btn"
                            onClick={() => console.log('Google login')}
                        >
                            <span className="social-icon" style={{ color: '#4285F4' }}>G</span>
                            Continue with Google
                        </button> */}
                        
                        <button type="button" className="social-btn">
    <FcGoogle size={20} />
    Continue with Google
</button>
                        {/* <button 
                            type="button"
                            className="social-btn"
                            onClick={() => console.log('Facebook login')}
                        >
                            <span className="social-icon" style={{ color: '#1877F2' }}>f</span>
                            Continue with Facebook
                        </button> */}
                        
<button type="button" className="social-btn">
    <FaFacebook size={20} />
    Continue with Facebook
</button>

{/* 
                        <button 
                            type="button"
                            className="social-btn"
                            onClick={() => console.log('Apple login')}
                        >
                            <span className="social-icon" style={{ color: '#000000' }}></span>
                            Continue with Apple
                        </button> */}
<button type="button" className="social-btn">
    <FaApple size={20} />
    Continue with Apple
</button>

                    </div>
                </div>

                {/* Agent Section */}
                <div className="agent-section">
                    <div className="agent-title">Are you a real estate agent?</div>
                    <button 
                        type="button"
                        className="agent-btn"
                        onClick={() => console.log('Agent login')}
                    >
                        Log in or create an account
                    </button>
                </div>

                {/* Terms Section */}
                <div className="terms-section">
                    <p className="terms-text">
                        By creating an account you agree to Instayards's{' '}
                        <a href="/terms" className="terms-links">Terms of Use</a>
                        {' '}and{' '}
                        <a href="/privacy" className="terms-links">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;