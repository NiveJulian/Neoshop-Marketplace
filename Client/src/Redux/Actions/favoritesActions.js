import axios from "axios";
import rutaBack from "./rutaBack"

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const FAVORITES_SENT_SUCCESS = "FAVORITES_SENT_SUCCESS";
export const FAVORITES_SENT_FAILURE = "FAVORITES_SENT_FAILURE";
export const GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
export const GET_FAVORITES_FAILURE = "GET_FAVORITES_FAILURE";

export const addToFavorites = (product) => ({
    type: ADD_TO_FAVORITES,
    payload: product,
  });

export const removeFromFavorites = (productId) => ({
    type: REMOVE_FROM_FAVORITES,
    payload: productId,
  });

export const sendFavorites = (userId, idProduct) => async (dispatch) => {
    console.log("user ID:", userId);
try {
    if (userId) {
    const data = {
        idUser: userId,
        idProduct,
    };
    console.log(data)

    const response = await axios.post(
        `${rutaBack}/favorites`,
        data
    );
    dispatch({ type: FAVORITES_SENT_SUCCESS, payload: response.data });
    } else {
    console.log("No user is logged in.");
    }
} catch (error) {
    console.error("Error sending favorites:", error);
    dispatch({ type: FAVORITES_SENT_FAILURE, error: error.response?.data || error.message });
}
};

export const getFavoritesByUserId = (userId) => async (dispatch) => {
try {
    // Realizar la petición GET para obtener la información de los favoritos del usuario
    const response = await axios.get(
    `${rutaBack}/favorites/id/${userId}`
    );
    // Despachar una acción con la información de los favoritos obtenida
    dispatch({ type: GET_FAVORITES_SUCCESS, payload: response.data.products });
} catch (error) {
    // En caso de error, despachar una acción de error
    console.error("Error al obtener los favoritos:", error);
    dispatch({ type: GET_FAVORITES_FAILURE, error });
}
};
