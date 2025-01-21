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

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password, confirmPassword } = formData;

      // Upload the image
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed MIME types
        const maxFileSize = 2 * 1024 * 1024; // 2MB

        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            setError("Only JPG, PNG, or PDF files are allowed.");
            return;
        }

        if (selectedFile && selectedFile.size > maxFileSize) {
            setError("File size should not exceed 2MB.");
            return;
        }

        setFile(selectedFile);
        setError(""); // Clear any file-related errors
    };

    

      // Send the signup data to the server
      const response = await axios.post('https://signupformback.vercel.app/api/signup', {
        username,
        email,
        password,
        confirmPassword,
        profileImage: imageUrl,
      });

      alert('User created successfully!');
      navigate('/login');
    } catch (error) {
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

          <div className="input-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" id="profileImage" onChange={handleFileChange} />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="right-container">
        <h1>Welcome Back!</h1>
        <button
          className="login-button"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
        <p className="login-message"><b>Already have an account? Please login.</b></p>
      </div>
    </div>
  );
};

export default Signup;
