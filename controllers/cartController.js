const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].qty += qty;
      } else {
        cart.cartItems.push({
          product: productId,
          name: product.name,
          price: product.price,
          qty,
          imageUrl: product.imageUrl,
        });
      }

      await cart.save();
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [{
          product: productId,
          name: product.name,
          price: product.price,
          qty,
          imageUrl: product.imageUrl,
        }],
      });

      await newCart.save();
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get cart items for user
// @route   GET /api/cart
// @access  Private
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name price imageUrl');

    if (cart) {
      res.json(cart.cartItems);
    } else {
      res.status(404).json({ message: 'Cart is empty' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.id);
      await cart.save();
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, getCartItems, removeCartItem };
