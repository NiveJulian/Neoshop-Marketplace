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
  CLEAR_PRODUCTS_STORE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_USER,
  UPDATE_DELIVERY,
  CLEAN_CART,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  categories: [],
  brands: [],
  seller: {},
  user: {},
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  filteredProducts: [],
  namedProducts: [],
  productsByStore: [],
  newProducts: [],
  condition: "allProducts",
  isAuth: false,
  registering: false,
  registerError: null,
  loginError: null,
  delivery:"",
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let sortedProducts;
  let priceProducts;
  let updatedCartItems;
  let existingProductIndex;

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

     case UPDATE_USER:
      return {
        ...state,
        user: payload
      }
    
    case UPDATE_DELIVERY:
      console.log("Reducer received payload:", payload); // Log para verificar el payload
      return{
        ...state,
        delivery:payload
      }  

    case GET_PRODUCT_FILTER:
      return { ...state, filteredProducts: payload };

    case GET_NEW:
      return { ...state, newProducts: payload };

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

    case CLEAR_PRODUCTS_STORE:
      return { ...state, productsByStore: [] };

    case SET_CONDITION:
      return { ...state, condition: payload };

    case ADD_TO_CART:
      // Verificar si el producto ya está en el carrito
      existingProductIndex = state.cartItems.findIndex(
        (item) => item.id_product === payload.id_product
      );
      if (existingProductIndex >= 0) {
        // Si ya está en el carrito, aumentar la cantidad
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingProductIndex
            ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 }
            : item
        );
      } else {
        // Si no está en el carrito, agregarlo con cantidad inicial de 1
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

      case CLEAN_CART:
        localStorage.removeItem("cartItems");
        return {
          ...state,
          cartItems: [],
        }
    default:
      return state;
  }
};

export default rootReducer;
