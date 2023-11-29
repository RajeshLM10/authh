const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

// Mock database (you should replace this with a real database connection)
const users = [
  { id: 1, email: 'user1@example.com', password: '$2b$10$q3PYrgXNM3iY8wA2nDqFQuQT2JZK1JOzTq2m/b7MyGsI8URrHnEr2' },
  { id: 2, email: 'rajeshkannan28k@gmail.com', password: '$2b$10$q3PYrgXNM3iY8wA2nDqFQuQT2JZK1JOzTq2m/b7MyGsI8URrHnEr2' } // Hashed password: '123'
  // Add more user data as needed
];

const emailTokens = {}; // Store email tokens temporarily

app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Endpoint to handle password reset form submission
app.post('/api/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body;

  // Check if the email and token match
  if (emailTokens[email] === token) {
    // Update the user's password in the mock database (replace with your actual password update logic)
    const user = users.find((user) => user.email === email);
    if (user) {
      // Hash the new password before storing it
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;

      // Remove the token to prevent reuse
      delete emailTokens[email];

      res.json({ message: 'Password reset successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid or expired reset link' });
  }
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the mock database
  const user = users.find((user) => user.email === email);

  if (user) {
    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');

    // Save the token and associate it with the user's email
    emailTokens[email] = token;

    // Send the reset link to the user's email
    sendResetEmail(email, token);

    res.json({ message: `Instructions to reset password sent to ${email}` });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Mock function to send reset email (replace with your actual email sending logic)
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password', // Replace with your email password or an app password
    },
  });

  const resetLink = `http://localhost:4000/api/reset-password/${email}/${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
