import React from 'react'
import ProductList from '../components/ProductList/ProductList'

const HomePage = () => {
  const allProducts = [
    {    
      id: 1,
      name: "TV 32",
      description: "Tv Samsung 32 Smart",
      date:  "2024-05-28",
      price: 200000,
      quantity: 1,
      available: true,
      average_mark: "Samsung",
      status: "Hay stock",
      id_review: 1,
      id_discounts: 1,
      id_store: 1,
    },
    {    
      id: 2,
      name: "Playstation 5",
      description: "Videogame Console",
      date:  "2024-05-25",
      price: 900000,
      quantity: 1,
      available: true,
      average_mark: "Sony",
      status: "Hay stock",
      id_review: 2,
      id_discounts: 2,
      id_store: 2,
    },
    {    
      id: 3,
      name: "Mouse",
      description: "Hardware",
      date:  "2024-05-23",
      price: 80000,
      quantity: 1,
      available: true,
      average_mark: "Logitech",
      status: "Hay stock",
      id_review: 3,
      id_discounts: 3,
      id_store: 3,
    },
    {    
      id: 4,
      name: "Speaker JBL",
      description: "Speaker waterproof",
      date:  "2024-05-21",
      price: 90000,
      quantity: 1,
      available: true,
      average_mark: "JBL",
      status: "Hay stock",
      id_review: 4,
      id_discounts: 4,
      id_store: 4,
    }
  ];

  return (
    <div>
      HomePage
      <div>
        <ProductList allProducts={allProducts} />
      </div>
    </div>
  );
}

export default HomePage;