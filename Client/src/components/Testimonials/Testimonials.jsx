import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { t } = useTranslation(); // Usa el hook useTranslation para acceder a las traducciones
  
  const testimonialData = t('testimonials', { returnObjects: true });
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => (prevIndex + 1) % testimonialData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialData]);

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