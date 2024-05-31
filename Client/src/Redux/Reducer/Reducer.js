import {
  CLEAR_FILTERED_PRODUCTS,
  GET_ALL,
  SET_CONDITION,
  SHOW_CATEGORY,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_NEW,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  newProducts: [],
  condition: "allProducts",
  isAuth: false,
  registering: false,
  registerError: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action; // destructuring del parámetro action

  switch (type) {
    case GET_ALL:
      return { ...state, allProducts: payload };

    case GET_NEW:
      return {...state, newProducts:payload};  

    case SHOW_CATEGORY:
      return {
        ...state,
        filteredProducts: state.allProducts.filter((product) =>
          product.category.includes(payload)
        ),
      };

    case CLEAR_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: [] };

    case SET_CONDITION:
      return { ...state, condition: payload };

    case REGISTER_SUCCESS:
      return { ...state, registering: true };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: true };

    default:
      return state;
  }
};

export default rootReducer;
