import axios from "axios";
import rutaBack from "./rutaBack";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "GET_CART_FAILURE";
export const CLEAN_CART = "CLEAN_CART";

export const UPDATE_CART = "UPDATE_CART";

export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAILURE = "DELETE_CART_ITEM_FAILURE";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const cleanCart = () => ({
  type: CLEAN_CART,
});

export const updateCartItemQuantity = (productId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { productId, quantity },
});

export const sendCart = (userId, cartItems) => async (dispatch) => {
  try {
    if (userId) {
      const data = {
        idUser: userId, // Ajusta el nombre de la propiedad a "idUser"
        arrayProducts: cartItems.map((product) => ({
          id_product: product.id_product,
          cartQuantity: product.cartQuantity,
        })),
      };
      // Realizar la petición POST 
      const response = await axios.post(`${rutaBack}/cart/`, data);
      // Despachar una acción si es necesario
      dispatch({ type: CART_SENT_SUCCESS, payload: response });
    } else {
      console.log("No user is logged in.");
    }
  } catch (error) {
    // console.error("Error sending cart:", error);
    dispatch({ type: CART_SENT_FAILURE, error });
  }
};


export const getCartByUserId = (userId) => async (dispatch) => {
  try {
    // Realizar la petición GET para obtener la información del carrito del usuario
    const response = await axios.get(`${rutaBack}/cart/id/${userId}`);
    // Despachar una acción con la información del carrito obtenida
    dispatch({ type: GET_CART_SUCCESS, payload: response.data.products });
  } catch (error) {
    // En caso de error, despachar una acción de error
    // console.error("Error al obtener el carrito:", error);
    dispatch({ type: GET_CART_FAILURE, error });
  }
};

export const deleteCartItem = (userId, idProduct) => async (dispatch) => {
  try {
    const response = await axios.delete(`${rutaBack}/cart/deleteItem`, {
      data: { idUser: userId, idProduct },
    });
    console.log(response.data)
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: response.data });

    // Verifica si el carrito está vacío después de la eliminación
    const cartResponse = await axios.get(`${rutaBack}/cart/id/${userId}`);
    if (cartResponse.data.products.length === 0) {
      dispatch(cleanCart());
    }
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAILURE,
      error: error.response?.data || error.message,
    });
  }
};

export const updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  payload: updatedCart
});