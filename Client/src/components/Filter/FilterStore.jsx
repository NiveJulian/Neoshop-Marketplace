import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./FilterCat.module.css";
import { filterProducts, renderCondition } from '../../Redux/Actions/productActions';

export default function FilterStore() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.store);
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);

  const [filters, setFilters] = useState({
    store: '',
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minPoint: '',
    maxPoint: ''
  });

  const [dropdown, setDropdown] = useState({
    store: false,
    brand: false,
    category: false,
  });

  const toggleDropdown = (dropdownType) => {
    setDropdown({
      store: dropdownType === 'store' ? !dropdown.store : false,
      brand: dropdownType === 'brand' ? !dropdown.brand : false,
      category: dropdownType === 'category' ? !dropdown.category : false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== '')
    );
    dispatch(filterProducts(filteredFilters));
    dispatch(renderCondition("filteredProducts"));
  };

  return (
    <div className="text-sm">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-3 flex">
          <button
            type="button"
            className="text-center w-full min-h-[3rem] items-center justify-between rounded-md bg-stone-100 px-4 py-2 text-stone-800"
            onClick={() => toggleDropdown('store')}
          >
            {filters.store || 'Select Store'}
            <i className="fas fa-angle-down text-stone-700"></i>
          </button>
          {dropdown.store && (
            <div className="absolute z-10 mt-1 left-full top-0 ml-2 w-48 rounded-md bg-white shadow-lg">
              <ul className="text-gray-700 dropdown-list">
                {stores.map((store) => (
                  <li key={store.id}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300"
                      onClick={() => {
                        setFilters({ ...filters, store: store.name });
                        toggleDropdown('store');
                      }}
                    >
                      {store.name}
                      {filters.store === store.name && (
                        <i className="fas fa-check text-green-400"></i>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative mb-3 flex">
          <button
            type="button"
            className="text-center w-full min-h-[3rem] items-center justify-between rounded-md bg-stone-100 px-4 py-2 text-stone-800"
            onClick={() => toggleDropdown('brand')}
          >
            {filters?.brand || 'Select Brand'}
            <i className="fas fa-angle-down text-stone-700"></i>
          </button>
          {dropdown?.brand && (
            <div className="absolute z-10 mt-1 left-full top-0 ml-2 w-48 rounded-md bg-white shadow-lg">
              <ul className="text-gray-700 dropdown-list">
                {brands?.map((brand) => (
                  <li key={brand.id}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300"
                      onClick={() => {
                        setFilters({ ...filters, brand: brand.name });
                        toggleDropdown('brand');
                      }}
                    >
                      {brand.name}
                      {filters.brand === brand.name && (
                        <i className="fas fa-check text-green-400"></i>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative mb-3 flex">
          <button
            type="button"
            className="text-center w-full min-h-[3rem] items-center justify-between rounded-md bg-stone-100 px-4 py-2 text-stone-800"
            onClick={() => toggleDropdown('category')}
          >
            {filters.category || 'Select Category'}
            <i className="fas fa-angle-down text-stone-700"></i>
          </button>
          {dropdown.category && (
            <div className="absolute z-10 mt-1 left-full top-0 ml-2 w-48 rounded-md bg-white shadow-lg">
              <ul className="text-gray-700 dropdown-list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 hover:bg-stone-500 hover:text-stone-300"
                      onClick={() => {
                        setFilters({ ...filters, category: category.name });
                        toggleDropdown('category');
                      }}
                    >
                      {category.name}
                      {filters.category === category.name && (
                        <i className="fas fa-check text-green-400"></i>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" className="bg-gray-200 w-full text-gray-500 rounded px-2 py-2 hover:bg-gray-100 hover:text-gray-600">
          FILTER
        </button>
      </form>
    </div>
  );
}