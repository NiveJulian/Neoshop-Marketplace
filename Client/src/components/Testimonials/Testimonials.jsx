// Testimonials.js

import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";

const testimonialData = [
  "Neo Shop made it so easy to set up my online store. The process was seamless and secure! - Happy Customer",
  "A fantastic platform that allows for customization and secure transactions. Highly recommend! - Satisfied User",
  "I've been using Neo Shop for a few months now, and it's been a game-changer for my business. The integration with other platforms is seamless! - Thrilled Entrepreneur",
  "I was skeptical at first, but Neo Shop exceeded my expectations. The support team is responsive, and the interface is intuitive. - Impressed User",
  "Setting up my store with Neo Shop was a breeze. I love how I can personalize every aspect of my storefront. - Delighted Seller"
];

const Testimonials = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => (prevIndex + 1) % testimonialData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center h-auto justify-center">
      {testimonialData.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          text={testimonial.split(" - ")[0]}
          author={testimonial.split(" - ")[1]}
          isVisible={index === visibleIndex}
        />
      ))}
    </div>
  );
};

export default Testimonials;
