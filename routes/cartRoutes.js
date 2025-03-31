const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Routes for authenticated users to manage their cart
router.post('/', protect, addToCart);       // Add item to cart
router.get('/', protect, getCartItems);     // Get cart items
router.delete('/:id', protect, removeCartItem); // Remove item from cart

module.exports = router;
