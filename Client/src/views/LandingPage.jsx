import "./LandingPage.css";
import React from "react";
import bgVideo from "../assets/videos/video2.mp4";
import logo from "../assets/images/logoSinFondo.png";

const LandingPage = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Neo Shop" />
        </div>
        <div className="navbar-links"></div>
      </nav>

      <header className="banner">
        <video autoPlay muted loop id="background-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="banner-content">
          <h1>Welcome to Neo Shop</h1>
          <p>
            Our project aims to create an innovative marketplace allowing users
            to create personalized stores, securely make purchases, and settle
            payments through the page.
          </p>
          <button
            className="cta-button"
            onClick={() => (window.location.href = "/home")}
          >
            <strong>Go to Store</strong>
          </button>
        </div>
      </header>

      <section id="features" className="features">
        <h2>Why Choose Neo Shop?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Personalized Stores</h3>
            <p>
              Create and customize your store with ease using our intuitive
              tools.
            </p>
          </div>
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>
              Enjoy safe and secure purchases with our robust payment system.
            </p>
          </div>
          <div className="feature-card">
            <h3>Easy Integration</h3>
            <p>Integrate with various platforms and services effortlessly.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>Customer Testimonials</h2>
        <div className="testimonial">
          <p>
            "Neo Shop made it so easy to set up my online store. The process was
            seamless and secure!"
          </p>
          <p>
            <strong>- Happy Customer</strong>
          </p>
        </div>
        <div className="testimonial">
          <p>
            "A fantastic platform that allows for customization and secure
            transactions. Highly recommend!"
          </p>
          <p>
            <strong>- Satisfied User</strong>
          </p>
        </div>
      </section>

      <footer id="github" className="footer">
        <button
          onClick={() =>
            (window.location.href =
              "https://github.com/Proyecto-final-organization")
          }
        >
          <strong>Go to GitHub</strong>
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;
