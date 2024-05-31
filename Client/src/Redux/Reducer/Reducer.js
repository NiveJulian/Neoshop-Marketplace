import {
  CLEAR_FILTERED_PRODUCTS,
  GET_ALL,
  SET_CONDITION,
  SHOW_CATEGORY,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_ALL_STORE,
  GET_PRODUCT_BY_ID,
  GET_SELLER_BY_ID,
  GET_NEW,
  SHOW_STORE,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  seller: {},
  filteredProducts: [],
  newProducts: [],
  condition: "allProducts",
  isAuth: false,
  registering: false,
  registerError: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
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

    case GET_NEW:
      return {...state, newProducts:payload};  

    case SHOW_CATEGORY:
      
      return {
        ...state,
        filteredProducts: state.allProducts.filter((product) =>
          product.categories.some((cat) =>cat.name ===payload)
        ),
      };

     case SHOW_STORE:
     
      return {
        ...state,
        filteredProducts: state.allProducts.filter ((product) => 
        product.store.name.includes(payload))
      } 

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
