/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './header.css';
import { setUser } from '../features/user_slice.js';

const header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    alert('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser(null));
    navigate('/');
  };
  return (
    <header>
            <nav>
              <h2>CHIRAG PANCHAL</h2>
                <ul>
                    
                    {!token ? (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
                </ul>
            </nav>
        </header>
  )
}

export default header
