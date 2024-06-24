/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import './home.css';
import { addToCart } from '../features/cart_slice.js';


const home = () => { // Ensure setCart is passed as prop correctly
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="products-list">
        {products.map(product => (
          <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
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
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="add-to-cart-btn">
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
