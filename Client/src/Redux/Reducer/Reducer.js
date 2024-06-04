import {
  CLEAR_FILTERED_PRODUCTS,
  GET_ALL,
  SET_CONDITION,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  IS_AUTH,
  GET_ALL_STORE,
  GET_PRODUCT_BY_ID,
  GET_SELLER_BY_ID,
  GET_NEW,
  GET_USER_BY_ID,
  SHOW_ABC,
  SHOW_PRICE,
  GET_PRODUCT_BY_NAME,
  ISNT_AUTH,
  GET_PRODUCT_FILTER,
  GET_ALL_CATEGORIES,
  GET_ALL_BRANDS,
  GET_PRODUCT_BY_STORE,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  categories: [],
  brands: [],
  seller: {},
  user: {},
  filteredProducts: [],
  namedProducts: [],
  productsByStore: [],
  newProducts: [],
  condition: "allProducts",
  isAuth: false,
  registering: false,
  registerError: null,
  loginError: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let sortedProducts;
  let priceProducts;

  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registering: true };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: payload };

    case IS_AUTH:
      return { ...state, isAuth: true, user: payload };

    case ISNT_AUTH:
      return { ...state, isAuth: false };

    case GET_ALL:
      return { ...state, allProducts: payload };

    case GET_ALL_STORE:
      return { ...state, store: payload };

    case GET_ALL_CATEGORIES:
      return { ...state, categories: payload };

    case GET_ALL_BRANDS:
      return { ...state, brands: payload };

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
      };
    case GET_PRODUCT_BY_STORE:
      return {
        ...state,
        productsByStore: payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
      };

    case GET_PRODUCT_FILTER:
      return { ...state, filteredProducts: payload };

    case GET_NEW:
      return { ...state, newProducts: payload };

    // case SHOW_CATEGORY:
    //   return {
    //     ...state,
    //     filteredProducts: state.allProducts.filter((product) =>
    //       product.categories.some((cat) => cat.name === payload)
    //     ),
    //   };

    //  case SHOW_STORE:
    //   return {
    //     ...state,
    //     filteredProducts: state.allProducts.filter((product) =>
    //       product.store.name.includes(payload)
    //     ),
    //   };

    case SHOW_ABC:
      sortedProducts = [];
      if (state.filteredProducts.length != 0) {
        sortedProducts = [...state.filteredProducts].sort((a, b) => {
          if (payload === "AZ") {
            return a.name.localeCompare(b.name);
          } else if (payload === "ZA") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      } else {
        sortedProducts = [...state.allProducts].sort((a, b) => {
          if (payload === "AZ") {
            return a.name.localeCompare(b.name);
          } else if (payload === "ZA") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      }
      return {
        ...state,
        filteredProducts: sortedProducts,
      };

    case SHOW_PRICE:
      if (state.filteredProducts.length !== 0) {
        priceProducts = [...state.filteredProducts].sort((a, b) => {
          if (payload === "menor") {
            return a.price - b.price;
          } else if (payload === "mayor") {
            return b.price - a.price;
          }
          return 0; // No hay ordenamiento
        });
      } else {
        priceProducts = [...state.allProducts].sort((a, b) => {
          if (payload === "menor") {
            return a.price - b.price;
          } else if (payload === "mayor") {
            return b.price - a.price;
          }
          return 0; // No hay ordenamiento
        });
      }
      return {
        ...state,
        filteredProducts: priceProducts,
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
