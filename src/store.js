// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user_slice';
import cartReducer from './features/cart_slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
