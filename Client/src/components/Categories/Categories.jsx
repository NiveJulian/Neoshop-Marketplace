import React, { useRef } from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
  const categorias = [
    "Tecnología", 
    "Hogar y Muebles", 
    "Electrodomésticos", 
    "Herramientas", 
    "Deportes y Fitness", 
    "Ropa", 
    "Juegos y Juguetes"
  ];

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -containerRef.current.clientWidth,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: containerRef.current.clientWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <button 
        onClick={scrollLeft} 
        className="p-2 bg-gray-300 rounded-full shadow-md mr-4"
        style={{ zIndex: 10 }}
      >
        &lt;
      </button>
      <div 
        ref={containerRef} 
        className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{ width: 'calc(100% - 80px)' }}
      >
        {categorias.map((categoria, index) => (
          <CategoryCard key={index} category={categoria} />
        ))}
      </div>
      <button 
        onClick={scrollRight} 
        className="p-2 bg-gray-300 rounded-full shadow-md ml-4"
        style={{ zIndex: 10 }}
      >
        &gt;
      </button>
    </div>
  );
};


export default Categories;