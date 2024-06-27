// TestimonialCard.js

import React from "react";
import { useSelector } from "react-redux";

const TestimonialCard = ({ text, author, isVisible }) => {
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  const authorColor = theme === "dark" ? "#b3b3b3" : "#1c1c1c";

  return (
    <div className={`bg-gray-200 shadow-md shadow-secondary p-6 rounded-md border border-secondary testimonial-card ${isVisible ? "slide-in" : ""}`}
    style={{background: backgroundColor}}>
      <p style={{color:textColor }}>{text}</p>
      <p className="font-bold" style={{color: authorColor }} >- {author}</p>
    </div>
  );
};

export default TestimonialCard;
