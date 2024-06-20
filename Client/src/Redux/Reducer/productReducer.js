import {
  CLEAR_FILTERED_PRODUCTS,
  CLEAR_PRODUCTS_STORE,
  GET_ALL,
  GET_NEW,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_STORE,
  GET_ALL_CATEGORIES,
  GET_PRODUCT_FILTER,
  SHOW_ABC,
  SHOW_PRICE,
  SET_CONDITION,
  MY_SHOPPING,
  SET_HISTORY,
} from "../Actions/productActions";

const initialState = {
  allProducts: [],
  product: {},
  categories: [],
  brands: [],
  filteredProducts: [],
  namedProducts: [],
  productsByStore: [],
  newProducts: [],
  condition: "allProducts",
  myShopping: [],
  history: [],
  filteredShopping: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let sortedProducts;
  let sortedShopping;
  let priceProducts;
  let priceShopping;

  switch (type) {
    case GET_ALL:
      return { ...state, allProducts: payload };
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
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload,
      };
    case GET_ALL_CATEGORIES:
      return { ...state, categories: payload };
    case GET_PRODUCT_FILTER:
      return { ...state, filteredProducts: payload };

    case GET_NEW:
      return { ...state, newProducts: payload };

    case SHOW_ABC:
      sortedProducts = [];
      sortedShopping = [];
      // ORDEN para todos los productos 
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
      // ORDEN para el historial de compras
      if (state.filteredShopping.length != 0) {
        sortedShopping = [...state.filteredShopping].sort((a, b) => {
          if (payload === "AZ") {
            return a.name.localeCompare(b.name);
          } else if (payload === "ZA") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      } else {
        sortedShopping = [...state.history].sort((a, b) => {
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
        filteredShopping: sortedShopping,
      };

    case SHOW_PRICE:
      // ORDEN para todos los productos
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
      // ORDEN para el historial
      if (state.filteredShopping.length !== 0) {
        priceShopping = [...state.filteredShopping].sort((a, b) => {
          if (payload === "menor") {
            return a.price - b.price;
          } else if (payload === "mayor") {
            return b.price - a.price;
          }
          return 0; // No hay ordenamiento
        });
      } else {
        priceShopping = [...state.history].sort((a, b) => {
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
        filteredShopping: priceShopping,
      };

    case CLEAR_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: [] };

    case CLEAR_PRODUCTS_STORE:
      return { ...state, productsByStore: [] };

    case SET_CONDITION:
      return { ...state, condition: payload };

    case MY_SHOPPING:
      console.log("payload en el reducer:", payload);
      return { ...state, myShopping: payload };

    case SET_HISTORY:
      return { ...state, history: payload }

    default:
      return state;
  }
};

export default productReducer;
