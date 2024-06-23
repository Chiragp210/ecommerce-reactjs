/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../features/cart_slice';
import './cart.css';

const cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    const updateTotal = () => {
      if (cart && cart.length > 0) {
        const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalQuantity(totalQty);
        setTotalPrice(totalPrice);
      } else {
        setTotalQuantity(0);
        setTotalPrice(0);
      }
    };

    updateTotal();
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };


  
  const handleCheckout = async () => {
    try {
      const orderData = {
        userId: user._id,
        cartItems: cart,
        paymentMethod,
      };

      const response = await axios.post('http://localhost:3200/api/order', orderData);
      alert('Order created:', response.data);
    } catch (error) {
      alert('Error creating order:', error);
    }
  };


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {!cart || cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                <br/>
                <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                <br/>
                <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
          <div className="payment-method">
            <h3>Choose Payment Method</h3>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="COD">Cash on Delivery</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default cart;
