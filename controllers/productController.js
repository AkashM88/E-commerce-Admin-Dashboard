const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
     return res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl, category, brand } = req.body;
  
  const product = new Product({
    name,
    description,
    price,
    countInStock,
    imageUrl,
    category,
    brand,
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl, category, brand } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.imageUrl = imageUrl || product.imageUrl;
      product.category = category || product.category;
      product.brand = brand || product.brand;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addProduct = async (req, res) => {
  
  console.log('Incoming Data:', req.body);

  const { name, price, description, image, brand, category, countInStock } = req.body;

  // Validate the incoming data
  if (!name || !price || !description || !image || !brand || !category || countInStock === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number." });
  }

  if (typeof countInStock !== 'number' || countInStock < 0) {
    return res.status(400).json({ message: "Count in stock must be a non-negative number." });
  }

  try {
    const product = new Product({
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// productController.js

// Controller to get all products with filtering and sorting
exports.getProducts = async (req, res) => {
  try {
    // Extract query parameters
    const category = req.query.category;
    const sortBy = req.query.sortBy; // e.g., 'price' or 'rating'
    const order = req.query.order === 'desc' ? -1 : 1; // Default is ascending

    // Build the filter object
    let filter = {};
    if (category) {
      filter.category = category;
    }

    // Fetch products with filter and sort options
    const products = await Product.find(filter).sort({ [sortBy]: order });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

    


module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
