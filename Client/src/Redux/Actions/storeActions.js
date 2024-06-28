import axios from "axios";
import toast from "react-hot-toast";
import rutaBack from "./rutaBack";

export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_SELLER_BY_NAME = "GET_SELLER_BY_NAME";
export const GET_ALL_STORE = "GET_ALL_STORE";

export const CREATE_STORE_SUCCESS = "CREATE_STORE_SUCCESS";
export const CREATE_STORE_FAILURE = "CREATE_STORE_FAILURE";

export const createStore = (formData, t) => async (dispatch) => {
  try {
    toast.loading(t("toast.waiting"));
    const response = await axios.post(`${rutaBack}/store`, formData);
    if (response.status === 200) {
      toast.success(t("toast.storeTrue"));
      dispatch({ type: CREATE_STORE_SUCCESS, payload: response.data });
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    }
  } catch (error) {
    dispatch({ type: CREATE_STORE_FAILURE, payload: error });
  }
};

export const getAllSellers = () => {
  const endpoint = `${rutaBack}/store`;

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
  const endpoint = `${rutaBack}/store`;

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

export const getSellerByName = (name) => {
  const endpoint = `${rutaBack}/store`;

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}/name/${name}`);
      dispatch({
        type: GET_SELLER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
