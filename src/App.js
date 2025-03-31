import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar'; 
import UserProfile from './components/UserProfile'; 
import OrderHistory from './components/OrderHistory'; 
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';

import BackToTopButton from './components/BackToBottom/BackToTopButton';

import Testimonials from './components/Testimonials/Testimonials';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Hero /> 
        <ProductCarousel />
        <BackToTopButton />
        <Testimonials />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
