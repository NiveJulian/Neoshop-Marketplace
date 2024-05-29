import axios from "axios";
import { products } from "./FakeBd";
export const GET_ALL = "GET_ALL";
export const SHOW_CATEGORY = "SHOW_CATEGORY";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const SET_CONDITION = "SET_CONDITION";
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


export const register = (formData) => async(dispatch) => {
    const endpoint = 'http://localhost:3001/'

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
    const allProducts = products ;
    return async (dispatch) => {
       try {
        //   let response= await axios.get(endpoint)
               return dispatch({
                   type: GET_ALL,
                   payload: allProducts
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
    payload: condition,
   })  