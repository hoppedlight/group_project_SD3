import React from "react";

const HeroSection = () => {
  return (
    <div className="hero-section__container">
      <img src="/images/hero-section-image.jpg" alt="hero-image" />
      <div className="hero-section__label">
        <div>
          <span>Send parcels to any point in the world</span>
        </div>
        <div className="hero-button__container">
          <button>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
