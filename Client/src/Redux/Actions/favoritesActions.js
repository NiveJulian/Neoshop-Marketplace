import axios from "axios";
import rutaBack from "./rutaBack"
import toast from "react-hot-toast";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const FAVORITES_SENT_SUCCESS = "FAVORITES_SENT_SUCCESS";
export const FAVORITES_SENT_FAILURE = "FAVORITES_SENT_FAILURE";
export const GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
export const GET_FAVORITES_FAILURE = "GET_FAVORITES_FAILURE";
export const DELETE_FAVORITE_ITEM_SUCCESS = "DELETE_FAVORITE_ITEM_SUCCESS"
export const DELETE_FAVORITE_ITEM_FAILURE = "DELETE_FAVORITE_ITEM_FAILURE"
export const CLEAN_FAVORITES = "CLEAN_FAVORITES"
export const UPDATE_FAVORITES = "UPDATE_FAVORITES"


export const addToFavorites = (product) => ({
    type: ADD_TO_FAVORITES,
    payload: product,
  });

export const removeFromFavorites = (product) => ({
    type: REMOVE_FROM_FAVORITES,
    payload: product,
  });

export const cleanFavorites = () => ({
    type: CLEAN_FAVORITES,
  });

  export const sendFavorites = (id_product, id_user) => async (dispatch) => {
    const endpoint = `${rutaBack}/favorites/`;
    try {
      if (id_user) {
        const response = await axios.post(endpoint, {
            id_product,
            id_user
          });
        dispatch({ type: FAVORITES_SENT_SUCCESS, payload: response });
      } else {
        console.log("No user is logged in.");
      }
    } catch (error) {
      dispatch({ type: FAVORITES_SENT_FAILURE, error });
    }
  };

  export const deleteFavoriteItem = (id_product, id_user) => async (dispatch) => {
    // Para seguir mañana: los datos acá llegan bien, pero en el controller deleteFavorite llegan ambos como undefined,
    // hasta donde vi se manda todo bien asi que no se por que puede ser, por otro lado el post y get funcionan perfectamente.
    const endpoint = `${rutaBack}/favorites/`;  
    
    try {
        if (id_user) {
          const response = await axios.delete(endpoint,{
            data: { id_product, id_user }
          });
            dispatch({ type: DELETE_FAVORITE_ITEM_SUCCESS, payload: response.data });
        } else {
            // console.log("No user is logged in.");
            toast.error("No user is logged in.")
        }  
    } catch (error) {
        toast.error(`Error al borrar de favoritos ${{error: error.message}}`);
      dispatch({
        type: DELETE_FAVORITE_ITEM_FAILURE,
        error: error.response?.data || error.message,
      });
    }
  };

  export const getFavoritesByUserId = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`${rutaBack}/favorites/${userId}`);
      dispatch({ type: GET_FAVORITES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_FAVORITES_FAILURE, error });
    }
  };
  
  export const updateFavorites = (updatedFavorites) => ({
    type: UPDATE_FAVORITES,
    payload: updatedFavorites
  });