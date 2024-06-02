import axios from "axios";
import { products, store } from "./FakeBd";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_ALL_STORE = "GET_ALL_STORE";
export const SHOW_CATEGORY = "SHOW_CATEGORY";
export const SHOW_STORE = "SHOW_STORE";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const SET_CONDITION = "SET_CONDITION";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";


export const login = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/login/";

  try {
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });

    if (response.status === 200 && response.data.correctLogin) {
      dispatch({ type: LOGIN_SUCCESS, payload: true });
      localStorage.setItem('isAuth', 'true');
    } else {
      localStorage.setItem('isAuth', 'false');
    }
  } catch (error) {
    localStorage.setItem('isAuth', 'false');
  }
};

export const register = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/user/";

  try {
    const response = await axios.post(`${endpoint}`, formData);

    if (response.status === 200) {
      dispatch({ type: REGISTER_SUCCESS });
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Aquí puedes realizar cualquier otra limpieza necesaria antes de desloguearte,
    // como por ejemplo limpiar el estado de usuario u otras variables de sesión.

    // Actualizar el estado de isAuth a false
    dispatch({ type: LOGIN_SUCCESS, payload: false });

    // Limpiar el token de autenticación almacenado en localStorage
    localStorage.setItem('isAuth', 'false');
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id) => {
  const endpoint = "http://localhost:3001/user";
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`);
      return dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// export const isAuthenticated = () => async (dispatch) => {
//   try {
//     const response = await axios.get('http://localhost:3001/auth-check', {
//       withCredentials: true,
//     });

//     if (response.status === 200 && response.data.isAuth) {
//       dispatch({ type: IS_AUTH, payload: true });
//       localStorage.setItem('isAuth', 'true');
//     } else {
//       dispatch({ type: IS_AUTH, payload: false });
//       localStorage.setItem('isAuth', 'false');
//     }
//   } catch (error) {
//     dispatch({ type: IS_AUTH, payload: false });
//     localStorage.setItem('isAuth', 'false');
//   }
// };

export const getAllProducts = () => {
  const endpoint = "http://localhost:3001/product/";
  return async (dispatch) => {
    try {
      let response = await axios.get(endpoint);
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
  const endpoint = "http://localhost:3001/product/";
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`);
      console.log(response);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getNewProducts = () => {
  const fakeProducts = products;
  return async (dispatch) => {
    try {
      // let response= await axios.get(endpoint)
      return dispatch({
        type: GET_NEW,
        payload: fakeProducts,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllSellers = () => {
  const allSellers = store;

  return async (dispatch) => {
    try {
      // console.log(allSellers);
      return dispatch({
        type: GET_ALL_STORE,
        payload: allSellers,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getSellerById = (id) => {
  const sellerById = store.find((seller) => seller.id === id);
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_SELLER_BY_ID,
        payload: sellerById,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const categoryFilter = (category) => ({
  type: SHOW_CATEGORY,
  payload: category,
});

export const storeFilter = (store) => ({
  type: SHOW_STORE,
  payload: store,
});

export const clearFilteredProducts = () => ({
  type: CLEAR_FILTERED_PRODUCTS,
});

export const renderCondition = (condition) => ({
  type: SET_CONDITION,
  payload: condition,
});

//    const groupProductsByStore = (products, stores) => {
//     // Crear un diccionario para las tiendas
//     const storesDict = stores.reduce((acc, store) => {
//       acc[store.id] = { ...store, products: [] };
//       return acc;
//     }, {});

//     // Asociar productos a sus respectivas tiendas
//     products.forEach(product => {
//       const storeId = product.id_store;
//       if (storesDict[storeId]) {
//         storesDict[storeId].products.push(product);
//       }
//     });

//     // Convertir el diccionario a un array de tiendas
//     return Object.values(storesDict);
//   };
