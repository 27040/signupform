import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password, confirmPassword } = formData;

      // Send the signup data to the server
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
        confirmPassword,
      });

      // Notify the user of successful signup
      console.log(response.data);
      alert('User created successfully!');

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      // Handle errors and display the error message
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <h2 className="register-title">Register Form</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="right-container">
        <h1>Welcome Back!</h1>
        <h2>Hello !!</h2>
        <button
          className="login-button"
          onClick={() => navigate('/login')} // Redirect to login page
        >
          Sign In
        </button>
        <p className="login-message"><b>Already have an account? Please login. </b></p>
      </div>
    </div>
  );
};

export default Signup;
