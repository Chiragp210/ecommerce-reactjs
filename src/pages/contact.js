import React from 'react';
import './contact.css';

const contact = () => {
  const userJson = localStorage.getItem('user');
  let user = null;

  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user JSON:', error);
      // Optionally, you can remove the corrupted data
      localStorage.removeItem('user');
    }
  }

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      {user ? (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      ) : (
        <p className="login-prompt">Please log in to view your contact details.</p>
      )}
      </div>
  );
};


export default contact