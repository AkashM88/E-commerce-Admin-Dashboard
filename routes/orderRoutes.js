const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes for creating orders and getting their own orders
router.post('/', protect, createOrder);              // Create a new order
router.get('/myorders', protect, getUserOrders);     // Get user's own orders

// Admin route to get all orders
router.get('/', protect, admin, getAllOrders);       // Admin: Get all orders

router.get('/:id', protect, getOrderById);           // Get a specific order by ID

// Admin route to update an order to 'delivered'
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
