import React from 'react';
import Cart from './cart';

const shoppingcart = ({cart, setCart}) => {
  return (
    <div>
        <Cart cart={cart} updateCart={setCart} />
    </div>
  )
}

export default shoppingcart