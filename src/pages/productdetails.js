/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './productdetails.css';
import { addToCart } from '../features/cart_slice.js';

const productdetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3200/api/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
          dispatch(addToCart(product));
          alert('Product added to cart!');
        }
      };
  
    if (!product) {
      return <div>Loading...</div>;
    }

  
    return (
        <div className="product-details-container">
        <h2>{product.title}</h2>
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    );
  };
export default productdetails;
