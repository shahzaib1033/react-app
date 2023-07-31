
import React, { useState } from 'react';
import { Style } from './style.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password
    };

    try {
      const response = await axios.post("http://localhost:8080/user/signin", requestBody);
      console.log(response);
      if (response.data.success) {

        localStorage.setItem('token', response?.data?.data?.token);
        navigate('/');
      } else {
        console.log('Login failed');
        navigate('/login');

      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };
  const forgotPassword = () => {
    navigate('/forgot')
  }
  return (
    <Style>
      <div className='bodyOfForm'>
        <div className='signInForm'>
          <span className='heading'>Welcome to Dashboard, Login</span>
          <form className='form'>
            <label>Email</label>
            <input
              className='input'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={handleEmailChange}
            />
            <label>Password</label>
            <input
              className='input'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={handlePasswordChange}
            />
            <button className='btn login' onClick={handleFormSubmit}>Login</button>
            <button className='btn forgot' onClick={forgotPassword}> ForgotPassword </button>
          </form>
        </div>
      </div>
    </Style>
  );
};

export default SignIn;
