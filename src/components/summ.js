import React, { useState } from 'react';
import './Login.css';
import ForgotPassword from './ForgotPassword';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch local API data
    fetch('users.json')
      .then((response) => response.json())
      .then((data) => {
        const user = data.users.find((user) => user.username === username);

        if (user && user.password === password) {
          // Successful login
          setLoggedInUser(user);
          setError('Login successful!');
        } else {
          // Login failed
          setLoggedInUser(null);
          setError('Invalid username or password.');
        }
      })
      .catch((error) => {
        console.error('Error fetching local API data: ' + error);
      });
  };

  const handleHomeClick = () => {
    // Handle navigation back to home or any other action
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleResetPassword = (email) => {
    // Handle reset password logic
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {loggedInUser ? (
          <div>
            <p>Welcome, {loggedInUser.username}!</p>
            <p>Your Email: {loggedInUser.email}</p>
            {/* Add more user details here */}
            <button onClick={handleHomeClick}>Home</button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <label>Username:</label>
            <input className="inp"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Login</button>
            
            <button  className="forget" onClick={handleForgotPasswordClick}>Forgot Password</button>
          </form>
        )}
        <p style={{ color: 'red' }}>{error}</p>
        {showForgotPassword && (
          <ForgotPassword
            onClose={handleForgotPasswordClose}
            onResetPassword={handleResetPassword}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
