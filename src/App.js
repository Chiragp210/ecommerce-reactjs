import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import ShoppingCart from './pages/shoppingcart.js';
import Contact from './pages/contact.js';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to local storage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
        <Route path="/home" element={<Home setCart={setCart} />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />}/>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
