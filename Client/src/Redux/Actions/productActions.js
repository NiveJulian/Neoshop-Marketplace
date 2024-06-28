import axios from "axios";
import rutaBack from "./rutaBack"

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
export const MY_SHOPPING = "MY_SHOPPING";
export const SET_HISTORY = "SET_HISTORY";
export const SET_FILTERS = "SET_FILTERS"
export const CLEAR_FILTER_STORE = 'CLEAR_FILTER_STORE';
export const CLEAR_FILTER_BRAND = 'CLEAR_FILTER_BRAND';
export const CLEAR_FILTER_CATEGORY = 'CLEAR_FILTER_CATEGORY';

export const getAllProducts = () => {
    const endpoint = `${rutaBack}/product/`;
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
    const endpoint = `${rutaBack}/product/`;
  
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
    const endpoint = `${rutaBack}/product/latest`;
    return async (dispatch) => {
      try {
        const response = await axios.get(endpoint);
        console.log(response );
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
    const endpoint = `${rutaBack}/product/global/${name}`;
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
    const endpoint = `${rutaBack}/product/allProductsStore/${id}`;
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
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${rutaBack}/category`);
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
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${rutaBack}/brand`);
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
    const endpoint = `${rutaBack}/product/filter`;
    return async (dispatch) => {
      try {
        console.log("los filtros que recibe la action:", filters);
        const queryString = new URLSearchParams(filters).toString();
        const response = await axios.get(`${endpoint}?${queryString}`);
        console.log("respuesta del filtrado:", response.data);
        return dispatch({
          type: GET_PRODUCT_FILTER,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const setActiveFilters = (filters) => {
    return {
      type: SET_FILTERS,
      payload: filters,
    }
  }

  export const myShopping = (userId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${rutaBack}/paying/user/${userId}`);
        console.log("repsuesta:", response.data); 
        dispatch({ type: MY_SHOPPING, payload: response.data });
      } catch (error) {
        console.error("Error al obtener las compras:", error);
        dispatch({ type: MY_SHOPPING, error });
      }
    };
  };

  export const setHistory = (history) => {
    return {
      type: SET_HISTORY,
      payload: history,
    }
  }

  
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