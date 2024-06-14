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
  CART_SENT_SUCCESS,
  CART_SENT_FAILURE,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_FACEBOOK,
  LOGOUT,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPDATE_USER,
  UPDATE_DELIVERY,
  CLEAN_CART,
  MY_SHOPPING,
} from "../Actions/Actions";

const initialState = {
  allProducts: [],
  product: {},
  store: [],
  images: [],
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
  cartSent: false,
  cartError: null,
  delivery:"",
  myShopping: [],
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
      return { ...state, isAuth: payload, user: payload };

    case IS_AUTH:
      // Guardar la información del usuario en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(payload));
      // Actualizar el estado global
      return { ...state, isAuth: true, user: payload };

    case ISNT_AUTH:
      // Eliminar la información del usuario del sessionStorage
      sessionStorage.removeItem("user");
      // Actualizar el estado global
      return { ...state, isAuth: false, user: {} };

    case LOGOUT:
      return { ...state, isAuth: false, user: {} };

    case LOGIN_WITH_GOOGLE:
      return { ...state, isAuth: true, user: payload };

    case LOGIN_WITH_FACEBOOK:
      return { ...state, isAuth: true, user: payload };

    case GET_ALL:
      return { ...state, allProducts: payload };

    case GET_ALL_STORE:
      return { ...state, store: payload };
    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          id_store: payload,
        },
      };

    case CREATE_STORE_FAILURE:
      return {
        ...state,
      };

    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, payload],
        error: null,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
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
        // cartError: payload,
      };

    case CLEAN_CART:
      localStorage.setItem("cartItems", "");
      return {
        ...state,
        cartItems: [],
      }

    case MY_SHOPPING:
      return { ...state, myShopping: payload };
      
    default:
      return state;
  }
};

export default rootReducer;