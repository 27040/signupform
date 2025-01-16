import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert("successfull login");
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="login-container">
      {/* Left container */}
      <div className="login-left">
        <h2>SignIn</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-butt">Login</button>
        </form>
      </div>

      {/* Right container */}
      <div className="login-right">
        <h1>Welcome!</h1>
        <p>Enter your personal details to access your employee account.</p>
        <button 
          className="signup-button" 
          onClick={() => navigate('/signup')}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Login;
