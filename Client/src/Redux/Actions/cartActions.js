import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "GET_CART_FAILURE";
export const CLEAN_CART = "CLEAN_CART";




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
      if (userId && cartItems !== 0) {
        const data = {
          idUser: userId, // Ajusta el nombre de la propiedad a "idUser"
          arrayProducts: cartItems.map((product) => ({
            id_product: product.id_product,
            cartQuantity: product.cartQuantity,
          })),
        };
  
        const response = await axios.post("https://neoshop-back.onrender.com/cart/", data);
        dispatch({ type: CART_SENT_SUCCESS, payload: response });
      } else {
        console.log("No user is logged in.");
      }
    } catch (error) {
      console.error("Error sending cart:", error);
      dispatch({ type: CART_SENT_FAILURE, error });
    }
  };
  
  export const getCartByUserId = (userId) => async (dispatch) => {
    try {
      // Realizar la petición GET para obtener la información del carrito del usuario
      const response = await axios.get(`https://neoshop-back.onrender.com/cart/id/${userId}`);
      // Despachar una acción con la información del carrito obtenida
      dispatch({ type: GET_CART_SUCCESS, payload: response.data.products });
    } catch (error) {
      // En caso de error, despachar una acción de error
      console.error("Error al obtener el carrito:", error);
      dispatch({ type: GET_CART_FAILURE, error });
    }
  };