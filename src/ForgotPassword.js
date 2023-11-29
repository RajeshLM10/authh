import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>

        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <button type="submit" onClick={handleSubmit}>Reset Password</button>

        {message && <p style={{ color: 'green' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
