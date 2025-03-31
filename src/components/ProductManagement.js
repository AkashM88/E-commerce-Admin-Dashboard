import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !price || !description || !image || !category || !brand) {
      toast.error('Please fill all fields');
      return;
    }

    const newProduct = { 
      name, 
      price: parseFloat(price), 
      description, 
      image, 
      category,
      brand,
      countInStock: parseInt(countInStock)
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/products', newProduct);
      setProducts([...products, data]);
      toast.success('Product added successfully');
      clearForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding product');
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter(product => product._id !== id));
  };

  const clearForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
    setBrand('');
    setCountInStock(0);
  };


  return (
    <div className="product-management-container">
      <h2 className="management-header">Product Management</h2>
      <div className="product-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Product Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            placeholder="Image URL" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input 
            type="text" 
            placeholder="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input 
            type="text" 
            placeholder="Brand" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input 
            type="number" 
            placeholder="Stock Quantity" 
            value={countInStock} 
            onChange={(e) => setCountInStock(e.target.value)} 
          />
        </div>
        <button 
          className="submit-btn" 
          onClick={handleAddProduct}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />


      <h3 className="products-header">Existing Products</h3>
      <div className="products-list">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
              <p>In Stock: {product.countInStock}</p>
            </div>
            <button 
              className="delete-btn"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductManagement;
