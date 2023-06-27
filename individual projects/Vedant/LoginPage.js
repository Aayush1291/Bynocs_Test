import React from 'react';
import LoginForm from './LoginForm';
import applogo from './applogo.png';

const LoginPage = () => {
    return (
        <div className="app-container">
          <div className="center-content">
            <img src={applogo} alt="Logo" />
            <LoginForm />
          </div>
        </div>
      );      
      
};

export default LoginPage;
