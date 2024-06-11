import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <button className="category-card text-lg font-bold flex-none w-1/4 p-5 bg-gray-100 text-center rounded-md cursor-pointer transition duration-300 hover:bg-gray-200 hover:shadow-lg active:bg-gray-300 active:shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-300">
      <p>{category}</p>
    </button>
  );
};

export default CategoryCard;