import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../ProductList.css';

import ProductFilter from './ProductFilter';
import ProductCard from '../ProductCard';

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [loading, setLoading] = useState(true);

  // Fetch products based on category and sorting
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products`, {
          params: { category, sortBy }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, qty: 1 });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-list-container">
      <h1>Products</h1>

      {/* Product filter component for category and sort options */}
      <ProductFilter
        onFilterChange={(value) => setCategory(value)}
        onSortChange={(value) => {
          const [sortField, order] = value.split('-');
          setSortBy(`${sortField}:${order}`);
        }}
      />

      {/* Product grid */}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={() => handleAddToCart(product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
