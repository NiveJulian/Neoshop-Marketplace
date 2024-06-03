import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, renderCondition } from '../../Redux/Actions/Actions';
import style from "./FilterCat.module.css";

export default function FilterStore () {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store);
 const brands = useSelector((state) => state.brands); // Asumiendo que tienes un estado de brand en Redux
  const categories = useSelector((state) => state.categories); // Asumiendo que tienes un estado de categories en Redux

  const [filters, setFilters] = useState({
    store: '',
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minPoint: '',
    maxPoint: ''
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filtrar los filtros que no estén vacíos
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== '')
    );

    dispatch(filterProducts(filteredFilters));
    dispatch(renderCondition("filteredProducts"));
  };

  return (
    <div className={style.font}>
      <form onSubmit={handleSubmit}>
        <select className={style.select} name="store" value={filters.store} onChange={handleChange}>
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.name}>{store.name}</option>
          ))}
        </select>

        <select className={style.select} name="brand" value={filters.brand} onChange={handleChange}>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>{brand.name}</option>
          ))}
        </select>

        <select className={style.select} name="categories" value={filters.category} onChange={handleChange}>
          <option value="">Select Categories</option>
          {categories.map((categories) => (
            <option key={categories.id} value={categories.name}>{categories.name}</option>
          ))}
        </select>
        <button type="submit" className="m-2 bg-gray-400 rounded hover:bg-gray-300">FILTER</button>
      </form>
    </div>
  );
};


        {/* <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="Min Price" />
        <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Max Price" />
        <input type="number" name="minPoint" value={filters.minPoint} onChange={handleChange} placeholder="Min Point" />
        <input type="number" name="maxPoint" value={filters.maxPoint} onChange={handleChange} placeholder="Max Point" /> */}
