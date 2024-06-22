/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import axios from 'axios';
import './register.css'

const register = () => {
    
    const initialFormData = {
        name: '',
        mobile: '',
        email: '',
        address: '',
        password: '',    
    };

    const [formData, setFormData] = useState(initialFormData);

      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        setErrors({
          ...errors,
          [name]: ''
        });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Perform frontend validation
          const validationErrors = {};
          if (!formData.name.trim()) {
            validationErrors.name = 'Name is required';
          }
          if (!formData.mobile.trim()) {
            validationErrors.mobile = 'Mobile number is required';
          }else if(!/^\d{10}$/.test(formData.mobile)){
            validationErrors.mobile = 'Invalid mobile number';
          }
          if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
          }
          if (!formData.address.trim()) {
            validationErrors.address = 'Address is required';
          }
          if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
          }
    
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
    
          // Send registration data to Node.js API
          const response = await axios.post('http://localhost:3200/api/auth/register', formData);
          console.log('Registration successful:', response.data);
          alert('Registration successful:', response.data);
          setFormData(initialFormData);
          setErrors({});
    
        } catch (error) {
          alert('Registration failed:', error);
        }
      };

    return (
        <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
      Already have an account? <a href="/login">Login here</a>
    </div>
      </div>
  )
}

export default register