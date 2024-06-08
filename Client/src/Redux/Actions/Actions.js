import axios from "axios";
import toast from "react-hot-toast";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCT_BY_STORE = "GET_PRODUCT_BY_STORE";
export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_ALL_STORE = "GET_ALL_STORE";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_PRODUCT_FILTER = "GET_PRODUCT_FILTER";
export const SHOW_CATEGORY = "SHOW_CATEGORY";
export const SHOW_STORE = "SHOW_STORE";
export const SHOW_ABC = "SHOW_ABC";
export const SHOW_PRICE = "SHOW_PRICE";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const CLEAR_PRODUCTS_STORE = "CLEAR_PRODUCTS_STORE";
export const SET_CONDITION = "SET_CONDITION";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const ISNT_AUTH = "ISNT_AUTH";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
import { deleteSessionToken } from "../../components/delCookie";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

// LOGIN
export const login = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/login/";
  try {
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });
    console.log(response);
    console.log(response);
    toast.loading("Waiting...");
    if (response.data.correctLogin) {
      toast.success("Login successful!");

      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    }
  } catch (error) {
    console.log(error);
    toast.error("Error al ingresar");
    localStorage.setItem("isAuth", "false");
  }
};

// LOGIN WITH GOOGLE
export const loginWithGoogle = (userInfo) => ({
  type: LOGIN_WITH_GOOGLE,
  payload: userInfo,
});

// export const doSignInWithGoogle = () => async (dispatch) => {
//   try {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const token = await result.user.getIdToken();

//     // Send the token to the backend
//     const response = await fetch("http://localhost:3001/login/auth/google", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token: token }),
//     });

//     if (response.ok) {
//       const userInfo = {
//         uid: result.user.uid,
//         email: result.user.email,
//         name: result.user.displayName,
//       };

//       dispatch(loginWithGoogle(userInfo));
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("isAuth", "true")
//       // Assuming you want to redirect to "/home" only on successful login
//       window.location.href = "/home";
//     } else {
//       throw new Error("Error al enviar el token al backend");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Login failed. Please try again.");
//   }
// };


// export const authWithGoogle = () => async (dispatch) => {
//   try {
//     const response = await axios.post("http://localhost:3001/login/auth/google", {
//     });
//     console.log(response);
//     if (response.data) {
//       dispatch({ type: IS_AUTH, payload: response.data });
//     } else {
//       dispatch({ type: ISNT_AUTH });
//     }
//   } catch (error) {
//     dispatch({ type: ISNT_AUTH });
//   }
// };

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT, payload: false });
    toast.loading("Waiting...");
    deleteSessionToken();

    document.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/user/";

  try {
    const response = await axios.post(`${endpoint}`, formData);
    
    toast.loading("Waiting...");
    if (response.status === 200) {
      toast.success("Register successful!");

      dispatch({ type: REGISTER_SUCCESS });
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    }else{
      toast.error("Error while registering")
    }
  } catch (error) {
    toast.error("Error while registering")

    console.log(error);
  }
};

export const getUserById = (id) => {
  const endpoint = "http://localhost:3001/user";
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`);
      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const isAuthenticated = (jwtToken) => async (dispatch) => {
    try {
      if (jwtToken) {
        const response = await axios.post("http://localhost:3001/login/auth", {
          token: jwtToken})    
          if (response.data) {
            dispatch({ type: IS_AUTH, payload: response.data });
          } 
          else {
            dispatch({ type: ISNT_AUTH });
        };
      } else {
        const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    // Envía el token al backend
    const googleresponse = await fetch("http://localhost:3001/login/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });
      if (googleresponse.data) {
        dispatch({ type: IS_AUTH, payload: googleresponse.data });
      }
      else {
        dispatch({ type: ISNT_AUTH });
      }
      }     
    } catch (error) {
      dispatch({ type: ISNT_AUTH });
    }
  }


//PRODUCTS
export const getAllProducts = () => {
  const endpoint = "http://localhost:3001/product/";
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}`);
      return dispatch({
        type: GET_ALL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductById = (id) => {
  const endpoint = "http://localhost:3001/product";

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}/id/${id}`);
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getNewProducts = () => {
  const endpoint = "http://localhost:3001/product/latest";
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      return dispatch({
        type: GET_NEW,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductByName = (name) => {
  const endpoint = `http://localhost:3001/product/name/${name}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(endpoint);
      dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductByStore = (id) => {
  const endpoint = `http://localhost:3001/product/allProductsStore/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(endpoint);
      console.log(response);
      dispatch({
        type: GET_PRODUCT_BY_STORE,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllSellers = () => {
  const endpoint = "http://localhost:3001/store/";

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}`);
      return dispatch({
        type: GET_ALL_STORE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getSellerById = (id) => {
  const endpoint = "http://localhost:3001/store";

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}/${id}`);
      dispatch({
        type: GET_SELLER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllCategories = () => {
  const endpoint = "http://localhost:3001/category";

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}`);
      return dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllBrands = () => {
  const endpoint = "http://localhost:3001/brand";

  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}`);
      return dispatch({
        type: GET_ALL_BRANDS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//FILTER

export const filterProducts = (filters) => {
  const endpoint = "http://localhost:3001/product/filter";
  return async (dispatch) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await axios.get(`${endpoint}?${queryString}`);
      console.log(response.data);
      return dispatch({
        type: GET_PRODUCT_FILTER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderProductsAbc = (vector) => ({
  type: SHOW_ABC,
  payload: vector,
});

export const orderProductsPrice = (price) => ({
  type: SHOW_PRICE,
  payload: price,
});

export const clearFilteredProducts = () => ({
  type: CLEAR_FILTERED_PRODUCTS,
});

export const clearProductsByStore = () => ({
  type: CLEAR_PRODUCTS_STORE,
});

export const renderCondition = (condition) => ({
  type: SET_CONDITION,
  payload: condition,
});

//CARRITO

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItemQuantity = (productId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { productId, quantity }
});