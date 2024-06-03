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
  SHOW_ABC,
  SHOW_PRICE,
  GET_PRODUCT_BY_NAME,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  seller: {},
  filteredProducts: [],
  namedProducts: [],
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

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        namedProducts: payload,
      }  

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
      
    case SHOW_ABC:
      const sortedProducts = [...state.allProducts].sort((a, b) => {
        if (action.payload === "AZ") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "ZA") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      return {
        ...state,
        filteredProducts: sortedProducts,
      }; 

    case SHOW_PRICE:
      const priceProducts = [...state.allProducts].sort ((a,b) =>{
        if (payload === "menor") {
          return a.price - b.price;
      } else if (payload === "mayor") {
          return b.price - a.price;
      }
      return 0; // No hay ordenamiento
      })
      return {
        ...state,
        filteredProducts: priceProducts,
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
