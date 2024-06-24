import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './features/user_slice.js';
import { setCart } from './features/cart_slice.js';
import Footer from './components/footer.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import ShoppingCart from './pages/shoppingcart.js';
import Contact from './pages/contact.js';
import ProductDetails from './pages/productdetails.js';

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      dispatch(setUser(savedUser));
    }
  }, [dispatch]);

  useEffect(() => {
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
        <Route path="/home" element={user ? <Home setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <ShoppingCart cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;