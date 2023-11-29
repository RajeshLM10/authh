import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>

        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>

        <button type="submit" onClick={handleSubmit}>Login</button>

        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
