import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    alert('Checkout functionality to be implemented!');
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.qty}</p>
                <p>Total: ${item.product.price * item.qty}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.product._id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
      <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
    </div>
  );
};

export default Cart;
