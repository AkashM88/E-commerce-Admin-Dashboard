import React, { useEffect, useState } from 'react';
import './BackToTopButton.css';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    showButton && (
      <button className="back-to-top" onClick={scrollToTop}>
        ↑ Top
      </button>
    )
  );
};

export default BackToTopButton;
