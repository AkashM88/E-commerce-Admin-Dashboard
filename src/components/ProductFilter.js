import React from 'react';

const ProductFilter = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="product-filter">
      <label>Filter by Category:</label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="accessories">Accessories</option>
      </select>

      <label>Sort by:</label>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="rating-desc">Rating (High to Low)</option>
      </select>
    </div>
  );
};

export default ProductFilter;
