// src/pages/Login.js
import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {

    const [loginData, setLoginData ] = useState({
        email:'',
        password:''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value
        });
        setErrors({
          ...errors,
          [name]: ''
        });
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const validationErrors = {};
            if(!loginData.email.trim()){
                validationErrors.email = 'Email is required';
            }else if(!/\S+@\S+\.\S+/.test(loginData.email)){
                validationErrors.email = 'Invalid email';
            }
            if(!loginData.password.trim()){
                validationErrors.password = 'Password is required';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
              }

            // Send login data to Node.js API
            const response = await axios.post('http://localhost:3200/api/auth/login', loginData);
            alert('Login successful:', response.data);

            // Store token or other user info in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to home page
            navigate('/home');

        }catch (error) {
            alert('Login failed:', error);
            setErrors({ api: 'Login failed. Please try again.' });
          }
    }

    return (
        <div className="login-form">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={loginData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={loginData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {errors.api && <span className="error">{errors.api}</span>}
        <button type="submit">Login</button>
      </form>
      <div className='link'>
      Create the account <a href="/register">Register Here</a>
      </div>
    </div>
    );
};

export default Login;
