import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CART_SENT_SUCCESS,
  CART_SENT_FAILURE,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  CLEAN_CART,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  UPDATE_CART,
} from "../Actions/cartActions";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartSent: false,
  cartError: null,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let updatedCartItems;
  let existingProductIndex;

  switch (type) {
    case ADD_TO_CART:
      existingProductIndex = state.cartItems.findIndex(
        (item) => item.id_product === payload.id_product
      );
      if (existingProductIndex >= 0) {
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...payload, cartQuantity: 1 },
        ];
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case REMOVE_FROM_CART:
      updatedCartItems = state.cartItems.filter(
        (item) => item.id_product !== payload
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case UPDATE_CART_ITEM_QUANTITY:
      updatedCartItems = state.cartItems.map((item) =>
        item.id_product === payload.productId
          ? { ...item, cartQuantity: payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case CART_SENT_SUCCESS:
      return {
        ...state,
        cartSent: true,
        cartError: null,
      };

    case CART_SENT_FAILURE:
      return {
        ...state,
        cartSent: false,
        cartError: payload,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: payload,
      };

    case GET_CART_FAILURE:
      return {
        ...state,
        cartError: payload,
      };

    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id_product !== payload.idProduct
        ),
      };

    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        cartError: action.error,
      };

    case CLEAN_CART:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
      };

    case UPDATE_CART:
      return {
        ...state,
        cartItems: action.payload.cartProducts,
      };
    default:
      return state;
  }
};

export default cartReducer;
