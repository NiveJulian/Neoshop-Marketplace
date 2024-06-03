import axios from "axios";
import { products } from "./FakeBd";
import { deleteSessionToken } from "../../components/delCookie";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_ALL_STORE = "GET_ALL_STORE";
export const GET_PRODUCT_FILTER = "GET_PRODUCT_FILTER";
export const SHOW_CATEGORY = "SHOW_CATEGORY";
export const SHOW_STORE = "SHOW_STORE";
export const SHOW_ABC = "SHOW_ABC";
export const SHOW_PRICE = "SHOW_PRICE";
export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
export const SET_CONDITION = "SET_CONDITION";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// LOGIN
export const login = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/login/";

  try {
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });
    console.log(response);

    if (response.data.correctLogin) {
      dispatch({ type: LOGIN_SUCCESS });
    }
  } catch (error) {
    localStorage.setItem("isAuth", "false");
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
    dispatch({ type: LOGIN_SUCCESS, payload: false });
    deleteSessionToken();

    document.location.href = "/";
  } catch (error) {
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

//

export const isAuthenticated = (jwtToken) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/login/auth", {
      token: jwtToken,
    });

    if (response.status === 200) {
      dispatch({ type: IS_AUTH, payload: response.data });
    } else {
      dispatch({ type: IS_AUTH, payload: false });
    }
  } catch (error) {
    dispatch({ type: IS_AUTH, payload: false });
    localStorage.setItem("isAuth", "false");
  }
};

//PRODUCTS
export const getAllProducts = () => {
  const endpoint = "http://localhost:3001/product/";
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}`);
      console.log(response)
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

// export const getProductByName = (name) => {
//   const endpoint = "http://localhost:3001/product";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}/name/${name}`);
//       console.log(response);
//       dispatch({
//         type: GET_PRODUCT_BY_ID,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

export const getNewProducts = () => {
  const fakeProducts = products;
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_NEW,
        payload: fakeProducts,
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
      return response.data
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

//

// export const filterProducts = () => {
// const endpoint = "http://localhost:3001/product/filter/";
// return async (dispatch) => {
//   try {
//     let response = await axios.get(endpoint)
//     console.log(response)
//     return dispatch({
//       type: GET_PRODUCT_FILTER,
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// };

//FILTER
export const categoryFilter = (category) => ({
  type: SHOW_CATEGORY,
  payload: category,
});
export const storeFilter = (store) => ({
  type: SHOW_STORE,
  payload: store,
});

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
