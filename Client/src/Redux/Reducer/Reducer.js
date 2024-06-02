import {
  CLEAR_FILTERED_PRODUCTS,
  GET_ALL,
  SET_CONDITION,
  SHOW_CATEGORY,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  IS_AUTH,
  GET_ALL_STORE,
  GET_PRODUCT_BY_ID,
  GET_SELLER_BY_ID,
  GET_NEW,
  SHOW_STORE,
  GET_USER_BY_ID,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  seller: {},
  user: {},
  filteredProducts: [],
  newProducts: [],
  condition: "allProducts",
  isAuth: localStorage.getItem("isAuth") === "true",
  registering: false,
  registerError: null,
  loginError: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registering: true };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: payload };

    case IS_AUTH:
      return { ...state, isAuth: payload };

    case GET_ALL:
      return { ...state, allProducts: payload };
    case GET_ALL_STORE:
      return { ...state, store: payload };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload,
      };
    case GET_SELLER_BY_ID:
      return {
        ...state,
        seller: payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
      };

    case GET_NEW:
      return { ...state, newProducts: payload };

    case SHOW_CATEGORY:
      return {
        ...state,
        filteredProducts: state.allProducts.filter((product) =>
          product.categories.some((cat) => cat.name === payload)
        ),
      };

    case SHOW_STORE:
      return {
        ...state,
        filteredProducts: state.allProducts.filter((product) =>
          product.store.name.includes(payload)
        ),
      };

    case CLEAR_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: [] };

    case SET_CONDITION:
      return { ...state, condition: payload };

    default:
      return state;
  }
};

export default rootReducer;
