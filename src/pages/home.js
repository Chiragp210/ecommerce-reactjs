/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const home = ({ setCart }) => { // Ensure setCart is passed as prop correctly
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product._id === productId);
    if (productToAdd) {
      setCart(prevCart => {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart.find(item => item._id === productId);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          updatedCart.push({ ...productToAdd, quantity: 1 });
        }
        return updatedCart;
      });
    }
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="products-list">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default home;
