import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HeroSection = () => {
  return (
    <div className="hero-section__container">
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-content">
            {/* Left: Image */}
            <img
              src="https://site-assets.novapost.com/e38ee329-414a-4836-abcb-0963ab2b08ec.png"
              alt=""
              className="slide-image"
            />

            {/* Right: Text and Button */}
            <div className="slide-text">
              <h2>Deliver your love by courier</h2>
              <p>
                Get a 20% discount on St.Valentine's Day with the promo code:
                FEBRUARY20
              </p>
              <button className="slide-button">Learn More</button>
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/9dc58130-37a3-4ff9-9ce3-273f2694848f.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/cc8610ca-b737-4083-b8b5-a8f5094955b2.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/f7da0253-8650-4d77-ab3a-3c56350509e1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/9aca1971-e8f8-4f4e-88ad-f058684fcc02.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/5de32925-1200-41e3-9bf7-72122a78137f.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/7e754899-44d0-41e0-a3ca-6dfc08ff74f6.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/b6165b5e-3434-43d8-9a3d-4dbccc1e4def.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://site-assets.novapost.com/25248b36-88be-47a5-af6c-5470ef169616.png"
            alt=""
          />
        </SwiperSlide> */}
      </Swiper>
      {/* <img src="/images/hero-section-image.jpg" alt="hero-image" />
      <div className="hero-section__label">
        <div>
          <span>Send parcels to any point in the world</span>
        </div>
        <div className="hero-button__container">
          <button>Get started</button>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;