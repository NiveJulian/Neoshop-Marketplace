// TestimonialCard.js

import React from "react";

const TestimonialCard = ({ text, author, isVisible }) => {
  return (
    <div className={`bg-gray-200 shadow-md shadow-secondary p-6 rounded-md border border-secondary testimonial-card ${isVisible ? "slide-in" : ""}`}>
      <p>{text}</p>
      <p className="font-bold">- {author}</p>
    </div>
  );
};

export default TestimonialCard;
