import React from 'react';
import './Testimonials.css';

const testimonials = [
  { name: "Alice", review: "Great quality products and fast shipping!" },
  { name: "Bob", review: "Amazing customer service and affordable prices." },
  { name: "Charlie", review: "My go-to store for all essentials!" },
];

const Testimonials = () => (
  <div className="testimonials">
    <h2>What Our Customers Say</h2>
    <div className="testimonial-cards">
      {testimonials.map((t, index) => (
        <div key={index} className="testimonial-card">
          <p>"{t.review}"</p>
          <h3>- {t.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default Testimonials;
