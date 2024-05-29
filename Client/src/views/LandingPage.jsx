import React, { useState } from "react";
import "./LandingPage.css";
import imagen from "../assets/images/imagen.webp";
import imagen2 from "../assets/images/imagen2.webp";
import imagen3 from "../assets/images/imagen3.webp";
import bgVideo from "../assets/videos/video2.mp4";

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [imagen, imagen2, imagen3];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="landing-container">
      <video className="background-video" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <header className="header">
        <h1 className="title">Welcome to Neo Shop</h1>
        <p className="subtitle">Find the best buy and sell products</p>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="carousel">
            <button className="carousel-button left" onClick={handlePrevClick}>
              {"🡨"}
            </button>
            <img
              src={images[currentIndex]}
              alt="Imagen Principal"
              className="hero-image"
            />
            <button className="carousel-button right" onClick={handleNextClick}>
              {"🡪"}
            </button>
          </div>
          <h2 className="hero-title">Discover our offers</h2>
          <p className="hero-description">
            We have a wide variety of products that you will love.
          </p>

          <a href="/home" className="cta-button">
            Go to the store
          </a>
        </section>

        <section className="testimonials-section">
          <h3 className="testimonials-title">What our clients say</h3>
          <div className="testimonials-container">
            <div className="testimonial">
              <p>
                "Excellent service and high quality products. Highly
                recommended!"
              </p>
              <p className="testimonial-author">- Juan Pérez</p>
            </div>
            <div className="testimonial">
              <p>"The best shopping experience I have had online."</p>
              <p className="testimonial-author">- Ana Gómez</p>
            </div>
            <div className="testimonial">
              <p>"Great variety of products and fast deliveries."</p>
              <p className="testimonial-author">- Carlos Martínez</p>
            </div>
            <div className="testimonial">
              <p>"Very competitive prices and excellent customer service."</p>
              <p className="testimonial-author">- Laura Sánchez</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; 2024. Developed by NeoShop Team. All of the code is open
          source.
        </p>
        <a
          href="https://github.com/Proyecto-final-organization"
          className="github-link"
        >
          Visit our GitHub
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;