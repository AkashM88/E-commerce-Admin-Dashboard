import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import './ProductCarousel.css';

const ProductCarousel = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(response.data.slice(0, 5)); // Take the first 5 products as featured
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {featuredProducts.map(product => (
          <div key={product._id} className="carousel-item">
            <img src={product.image} alt={product.name} />
            <p className="legend">{product.name} - ${product.price}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
