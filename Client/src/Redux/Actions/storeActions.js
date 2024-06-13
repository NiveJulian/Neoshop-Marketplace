import axios from "axios";
import toast from "react-hot-toast";

export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_ALL_STORE = "GET_ALL_STORE";

export const CREATE_STORE_SUCCESS = "CREATE_STORE_SUCCESS";
export const CREATE_STORE_FAILURE = "CREATE_STORE_FAILURE";



export const createStore = (formData) => async (dispatch) => {
    try {
      const response = await axios.post("https://neoshop-back.onrender.com/store/", formData);
      if (response.status === 200) {
        toast.success("Your store is create");
        dispatch({ type: CREATE_STORE_SUCCESS, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: CREATE_STORE_FAILURE, payload: error });
    }
  };
  

export const getAllSellers = () => {
    const endpoint = "https://neoshop-back.onrender.com/store/";
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}`);
        return dispatch({
          type: GET_ALL_STORE,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getSellerById = (id) => {
    const endpoint = "https://neoshop-back.onrender.com/store";
  
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        dispatch({
          type: GET_SELLER_BY_ID,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  