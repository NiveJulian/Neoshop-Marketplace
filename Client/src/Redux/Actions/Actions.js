import axios from "axios";
import { products, store } from "./FakeBd";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
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

export const getAllProducts= ()=>{
    const endpoint = {products} ;
    return async (dispatch) => {
       try {
        // let response= await axios.get(endpoint)
               return dispatch({
                   type: GET_ALL,
                   payload: endpoint,
               });
               
       } catch (error) {
         console.log(error.message);  
       }
   }
}

export const getNewProducts= ()=>{
    const fakeProducts= products;
    return async (dispatch) => {
       try {
        // let response= await axios.get(endpoint)
               return dispatch({
                   type: GET_NEW,
                   payload: fakeProducts,
               });
               
       } catch (error) {
         console.log(error.message);  
       }
   }
}

export const categoryFilter = (category) => ({
    type: SHOW_CATEGORY,
    payload: category,
});

export const clearFilteredProducts = () => ({
    type: CLEAR_FILTERED_PRODUCTS
})
  
export const renderCondition = (condition) => ({
    type: SET_CONDITION,
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
  