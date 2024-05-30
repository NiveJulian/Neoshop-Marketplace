import axios from "axios";
import { products, store } from "./FakeBd";
export const GET_ALL = "GET_ALL";
export const GET_ALL_STORE = "GET_ALL_STORE";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const SHOW_CATEGORY = "SHOW_CATEGORY";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const SET_CONDITION = "SET_CONDITION";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = (formData) => async(dispatch) => {
    const endpoint = 'http://localhost:3001/user/'

    try {
        const response = await axios.post(`${endpoint}`, formData);

        if(response.status === 200){
            dispatch({type: LOGIN_SUCCESS})
        }
    } catch (error) {
        console.log(error)
    }
}

export const register = (formData) => async(dispatch) => {
    const endpoint = 'http://localhost:3001/user/'

    try {
        const response = await axios.post(`${endpoint}`, formData);

        if(response.status === 201){
            dispatch({type: REGISTER_SUCCESS})
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = () => {
    const allProducts = products;
  
    return async (dispatch) => {
      try {
        return dispatch({
          type: GET_ALL,
          payload: allProducts,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
};

export const getAllSellers = () => {
    const allSellers = store;
  
    return async (dispatch) => {
      try {
        console.log(allSellers)
        return dispatch({
          type: GET_ALL_STORE,
          payload: allSellers,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
};

export const getProductById = (id) => {
    const productById = products.find((product) => product.id_product === id);
    return async (dispatch) => {
      try {
        return dispatch({
          type: GET_PRODUCT_BY_ID,
          payload: productById,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
};

export const categoryFilter = (category) => ({
    type: SHOW_CATEGORY,
    payload: category,
});

export const clearFilteredProducts = () => ({
    type: CLEAR_FILTERED_PRODUCTS
})
  
export const renderCondition = (condition) => ({
    type: SET_CONDITION,
    payload: condition,
})  


//    const groupProductsByStore = (products, stores) => {
//     // Crear un diccionario para las tiendas
//     const storesDict = stores.reduce((acc, store) => {
//       acc[store.id] = { ...store, products: [] };
//       return acc;
//     }, {});
  
//     // Asociar productos a sus respectivas tiendas
//     products.forEach(product => {
//       const storeId = product.id_store;
//       if (storesDict[storeId]) {
//         storesDict[storeId].products.push(product);
//       }
//     });
  
//     // Convertir el diccionario a un array de tiendas
//     return Object.values(storesDict);
//   };
  