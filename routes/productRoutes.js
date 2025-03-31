const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts).post(createProduct);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.route('/:id').put(updateProduct);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.route('/:id').delete(deleteProduct);

module.exports = router;
