import axios from "axios";

export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const CLEAR_PRODUCTS_STORE = "CLEAR_PRODUCTS_STORE";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCT_BY_STORE = "GET_PRODUCT_BY_STORE";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_PRODUCT_FILTER = "GET_PRODUCT_FILTER";
export const SHOW_ABC = "SHOW_ABC";
export const SHOW_PRICE = "SHOW_PRICE";
export const SET_CONDITION = "SET_CONDITION";



export const getAllProducts = () => {
    const endpoint = "https://neoshop-back.onrender.com/product/";
    return async (dispatch) => {
      try {
        let response = await axios.get(`${endpoint}`);
        return dispatch({
          type: GET_ALL,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getProductById = (id) => {
    const endpoint = "https://neoshop-back.onrender.com/product";
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}/id/${id}`);
        dispatch({
          type: GET_PRODUCT_BY_ID,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getNewProducts = () => {
    const endpoint = "https://neoshop-back.onrender.com/product/latest";
    return async (dispatch) => {
      try {
        const response = await axios.get(endpoint);
        return dispatch({
          type: GET_NEW,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getProductByName = (name) => {
    const endpoint = `https://neoshop-back.onrender.com/product/name/${name}`;
    return async (dispatch) => {
      try {
        let response = await axios.get(endpoint);
        dispatch({
          type: GET_PRODUCT_BY_NAME,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getProductByStore = (id) => {
    const endpoint = `https://neoshop-back.onrender.com/product/allProductsStore/${id}`;
    return async (dispatch) => {
      try {
        let response = await axios.get(endpoint);
        console.log(response);
        dispatch({
          type: GET_PRODUCT_BY_STORE,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
export const getAllCategories = () => {
    const endpoint = "https://neoshop-back.onrender.com/category";
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}`);
        return dispatch({
          type: GET_ALL_CATEGORIES,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getAllBrands = () => {
    const endpoint = "https://neoshop-back.onrender.com/brand";
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}`);
        return dispatch({
          type: GET_ALL_BRANDS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const filterProducts = (filters) => {
    const endpoint = "https://neoshop-back.onrender.com/product/filter";
    return async (dispatch) => {
      try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await axios.get(`${endpoint}?${queryString}`);
        console.log(response.data);
        return dispatch({
          type: GET_PRODUCT_FILTER,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };


  
export const orderProductsAbc = (vector) => ({
    type: SHOW_ABC,
    payload: vector,
  });
  
  export const orderProductsPrice = (price) => ({
    type: SHOW_PRICE,
    payload: price,
  });
  
  export const clearFilteredProducts = () => ({
    type: CLEAR_FILTERED_PRODUCTS,
  });
  
  export const clearProductsByStore = () => ({
    type: CLEAR_PRODUCTS_STORE,
  });

  export const renderCondition = (condition) => ({
    type: SET_CONDITION,
    payload: condition,
  });