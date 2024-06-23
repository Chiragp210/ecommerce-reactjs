// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    setCart: (state, action) => action.payload,
    addToCart: (state, action) => {
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => state.filter(item => item._id !== action.payload),
    increaseQuantity: (state, action) => {
      const existingItem = state.find(item => item._id === action.payload);
      if (existingItem) existingItem.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.find(item => item._id === action.payload);
      if (existingItem && existingItem.quantity > 1) existingItem.quantity--;
    },
  },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
