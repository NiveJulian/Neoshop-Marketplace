import axios from "axios";
import { products, store } from "./FakeBd";
export const GET_ALL = "GET_ALL";
export const GET_NEW = "GET_NEW";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
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

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/login/";

  try {
    const response = await axios.post(`${endpoint}`, formData);

    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS });
      
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData) => async (dispatch) => {
  const endpoint = "http://localhost:3001/user/";

  try {
    const response = await axios.post(`${endpoint}`, formData);

    if (response.status === 200) {
      dispatch({ type: REGISTER_SUCCESS });
    }
  } catch (error) {
    console.log(error);
  }
};

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
  const endpoint = 'http://localhost:3001/product/'
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`)
      console.log(response)
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
      console.log(allSellers);
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

export const orderProductsAbc = (vector) => ({
    type: SHOW_ABC,
    payload: vector,
})

export const orderProductsPrice = (price) => ({
    type: SHOW_PRICE,
    payload: price,
})

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
