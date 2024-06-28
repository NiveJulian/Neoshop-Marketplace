import {
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    FAVORITES_SENT_SUCCESS,
    FAVORITES_SENT_FAILURE,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE,
    DELETE_FAVORITE_ITEM_SUCCESS,
    DELETE_FAVORITE_ITEM_FAILURE,
    UPDATE_FAVORITES,
    CLEAN_FAVORITES
  } from "../Actions/favoritesActions";

  const initialState = {
    favItems: JSON.parse(localStorage.getItem("favoritesItems")) || [],
    favSent: false,
    favError: null,
  };
  
  const favoritesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    let updatedFavItems;
    let existingProductIndex;
  
    switch (type) {
        case ADD_TO_FAVORITES:
          existingProductIndex = state.favItems.findIndex(
            (item) => item.id_product === payload.id_product
          );
          if (existingProductIndex >= 0) {
            updatedFavItems = state.favItems.map((item, index) =>
              index === existingProductIndex
                ? { ...item, favQuantity: (item.favQuantity || 1) + 1 }
                : item
            );
          } else {
            updatedFavItems = [
              ...state.favItems,
              { ...payload, favQuantity: 1 },
            ];
          }
          localStorage.setItem("favoritesItems", JSON.stringify(updatedFavItems));
          return {
            ...state,
            favItems: updatedFavItems,
          };
    
        case REMOVE_FROM_FAVORITES:
          updatedFavItems = state.favItems.filter(
            (item) => item.id_product !== payload.id_product
          );
          localStorage.setItem("favoritesItems", JSON.stringify(updatedFavItems));
          return {
            ...state,
            favItems: updatedFavItems,
          };

        case FAVORITES_SENT_SUCCESS:
          return {
            ...state,
            favSent: true,
            favError: null,
          };
    
        case FAVORITES_SENT_FAILURE:
          return {
            ...state,
            favSent: false,
            favError: payload,
          };
    
        case GET_FAVORITES_SUCCESS:
          localStorage.setItem("favoritesItems", JSON.stringify(payload))
          return {
            ...state,
            favItems: payload
          };
    
        case GET_FAVORITES_FAILURE:
          return {
            ...state,
            favError: payload,
          };

        case DELETE_FAVORITE_ITEM_SUCCESS:
          updatedFavItems = state.favItems.filter(
            (item) => item.id_product !== payload.idProduct
          );
          localStorage.setItem("favoritesItems", JSON.stringify(updatedFavItems));
          return {
            ...state,
            favItems: updatedFavItems,
          };

        case DELETE_FAVORITE_ITEM_FAILURE:
          return {
            ...state,
            favError: action.error,
          };
    
        case CLEAN_FAVORITES:
          localStorage.removeItem("favoritesItems");
          return {
            ...state,
            favItems: [],
          };
    
        case UPDATE_FAVORITES:
          return {
            ...state,
            cartItems: action.payload,
          };

      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  