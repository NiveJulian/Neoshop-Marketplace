// import axios from "axios";
// import toast from "react-hot-toast";
// export const GET_ALL = "GET_ALL";
// export const GET_NEW = "GET_NEW";
// export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
// export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
// export const GET_PRODUCT_BY_STORE = "GET_PRODUCT_BY_STORE";
// export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
// export const GET_ALL_STORE = "GET_ALL_STORE";
// export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
// export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
// export const GET_PRODUCT_FILTER = "GET_PRODUCT_FILTER";
// export const POST_PAYMENT = "POST_PAYMENT";
// export const SHOW_CATEGORY = "SHOW_CATEGORY";
// export const SHOW_STORE = "SHOW_STORE";
// export const SHOW_ABC = "SHOW_ABC";
// export const SHOW_PRICE = "SHOW_PRICE";
// export const CLEAR_FILTERED_PRODUCTS = "CLEAR_FILTERED_PRODUCTS";
// export const CLEAR_PRODUCTS_STORE = "CLEAR_PRODUCTS_STORE";
// export const SET_CONDITION = "SET_CONDITION";
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// export const IS_AUTH = "IS_AUTH";
// export const ISNT_AUTH = "ISNT_AUTH";
// export const GET_USER_BY_ID = "GET_USER_BY_ID";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGOUT = "LOGOUT";
// export const ADD_TO_CART = "ADD_TO_CART";
// export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// export const UPDATE_USER = "UPDATE_USER";
// export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
// export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
// export const LOGIN_WITH_FACEBOOK = "LOGIN_WITH_FACEBOOK";
// import { deleteSessionToken } from "../../components/delCookie";
// // import { auth } from "../../firebase/firebase";
// // import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// // import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
// export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
// export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
// export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
// export const GET_CART_FAILURE = "GET_CART_FAILURE";
// export const CREATE_STORE_SUCCESS = "CREATE_STORE_SUCCESS";
// export const CREATE_STORE_FAILURE = "CREATE_STORE_FAILURE";

// export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
// export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";
// export const UPDATE_DELIVERY = "UPDATE_DELIVERY";
// export const CLEAN_CART = "CLEAN_CART";

// import { useTranslation } from "react-i18next";

// const { t, i18n } = useTranslation();

// // LOGIN
// export const login = (formData) => async (dispatch) => {
//   const endpoint = "http://localhost:3001/login/";
//   try {
//     const response = await axios.post(endpoint, formData, {
//       withCredentials: true,
//     });
//     toast.loading(t("toast.waiting"));
//     if (response.data.correctLogin) {
//       toast.success(t("toast.loginTrue"));
//       dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(t("toast.loginFalse"));
//     localStorage.setItem("isAuth", "false");
//   }
// };

// // LOGIN WITH GOOGLE
// export const loginWithGoogle = (userInfo) => ({
//   type: LOGIN_WITH_GOOGLE,
//   payload: userInfo,
// });

// export const loginWithFacebook = (userInfo) => ({
//   type: LOGIN_WITH_FACEBOOK,
//   payload: userInfo,
// });

// // export const doSignInWithGoogle = () => async (dispatch) => {
// //   try {
// //     const auth = getAuth();
// //     const provider = new GoogleAuthProvider();
// //     const result = await signInWithPopup(auth, provider);
// //     const token = await result.user.getIdToken();

// //     // Send the token to the backend
// //     const response = await fetch("http://localhost:3001/login/auth/google", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ token: token }),
// //     });

// //     if (response.ok) {
// //       const userInfo = {
// //         uid: result.user.uid,
// //         email: result.user.email,
// //         name: result.user.displayName,
// //       };

// //       dispatch(loginWithGoogle(userInfo));
// //       localStorage.setItem("authToken", token);
// //       localStorage.setItem("isAuth", "true")
// //       // Assuming you want to redirect to "/home" only on successful login
// //       window.location.href = "/home";
// //     } else {
// //       throw new Error("Error al enviar el token al backend");
// //     }
// //   } catch (error) {
// //     console.error("Error:", error);
// //     toast.error("Login failed. Please try again.");
// //   }
// // };

// // export const authWithGoogle = () => async (dispatch) => {
// //   try {
// //     const response = await axios.post("http://localhost:3001/login/auth/google", {
// //     });
// //     console.log(response);
// //     if (response.data) {
// //       dispatch({ type: IS_AUTH, payload: response.data });
// //     } else {
// //       dispatch({ type: ISNT_AUTH });
// //     }
// //   } catch (error) {
// //     dispatch({ type: ISNT_AUTH });
// //   }
// // };

// // LOGOUT

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOGOUT, payload: false });
//     toast.loading(t("toast.waiting"));
//     deleteSessionToken();
//     localStorage.setItem("authToken", "false");

//     document.location.href = "/";
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const register = (formData) => async (dispatch) => {
//   const endpoint = "http://localhost:3001/user/";

//   try {
//     const response = await axios.post(`${endpoint}`, formData);

//     toast.loading(t("toast.waiting"));
//     if (response.status === 200) {
//       toast.success(t("toast.registerTrue"));

//       dispatch({ type: REGISTER_SUCCESS });
//       setTimeout(() => {
//         location.href = "/confirmation";
//       }, 2000);
//     } else {
//       toast.error(t("toast.registerFalse"));
//     }
//   } catch (error) {
//     toast.error(t("toast.registerFalse"));

//     console.log(error);
//   }
// };

// export const getUserById = (id) => {
//   const endpoint = "http://localhost:3001/user";
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(`${endpoint}/${id}`);
//       dispatch({
//         type: GET_USER_BY_ID,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const isAuthenticated = (jwtToken) => async (dispatch) => {
//   const endpoint = "http://localhost:3001/login/auth";
//   try {
//     if (jwtToken) {
//       const response = await axios.post(endpoint, {
//         token: jwtToken,
//         provider: "jwt",
//       });
//       if (response.data) {
//         dispatch({ type: IS_AUTH, payload: response.data });
//       } else {
//         dispatch({ type: ISNT_AUTH });
//       }
//     } else {
//       const googletoken = localStorage.getItem("authToken");
//       const response = await axios.post(endpoint, {
//         token: googletoken,
//         provider: "google",
//       });
//       if (response.data) {
//         dispatch({ type: IS_AUTH, payload: response.data });
//       } else {
//         dispatch({ type: ISNT_AUTH });
//       }
//     }
//   } catch (error) {
//     dispatch({ type: ISNT_AUTH });
//   }
// };

// export const updateUserAddress = (formUpdate) => async (dispatch) => {
//   const endpoint = "http://localhost:3001/user/update";

//   try {
//     const response = await axios.put(endpoint, formUpdate);

//     if (response.status === 200) {
//       toast.success(t("toast.updateTrue"));
//       dispatch({
//         type: UPDATE_USER,
//         payload: response.data,
//       });
//       setTimeout(() => {
//         location.href = "/payPreview";
//       }, 5000);
//     }
//   } catch (error) {
//     toast.error(t("toast.updateFalse"));
//     console.log(error);
//   }
// };

// //PRODUCTS
// export const getAllProducts = () => {
//   const endpoint = "http://localhost:3001/product/";
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(`${endpoint}`);
//       return dispatch({
//         type: GET_ALL,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getProductById = (id) => {
//   const endpoint = "http://localhost:3001/product";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}/id/${id}`);
//       dispatch({
//         type: GET_PRODUCT_BY_ID,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getNewProducts = () => {
//   const endpoint = "http://localhost:3001/product/latest";
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(endpoint);
//       return dispatch({
//         type: GET_NEW,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getProductByName = (name) => {
//   const endpoint = `http://localhost:3001/product/global/${name}`;
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(endpoint);
//       dispatch({
//         type: GET_PRODUCT_BY_NAME,
//         payload: response.data,
//       });
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getProductByStore = (id) => {
//   const endpoint = `http://localhost:3001/product/allProductsStore/${id}`;
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(endpoint);
//       console.log(response);
//       dispatch({
//         type: GET_PRODUCT_BY_STORE,
//         payload: response.data,
//       });
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getAllSellers = () => {
//   const endpoint = "http://localhost:3001/store/";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}`);
//       return dispatch({
//         type: GET_ALL_STORE,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getSellerById = (id) => {
//   const endpoint = "http://localhost:3001/store";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}/${id}`);
//       dispatch({
//         type: GET_SELLER_BY_ID,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getAllCategories = () => {
//   const endpoint = "http://localhost:3001/category";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}`);
//       return dispatch({
//         type: GET_ALL_CATEGORIES,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getAllBrands = () => {
//   const endpoint = "http://localhost:3001/brand";

//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${endpoint}`);
//       return dispatch({
//         type: GET_ALL_BRANDS,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// //STORE

// export const createStore = (formData) => async (dispatch) => {
//   console.log(formData);
//   try {
//     const response = await axios.post("http://localhost:3001/store/", formData);
//     if (response.status === 200) {
//       toast.success(t("toast.storeTrue"));
//       dispatch({ type: CREATE_STORE_SUCCESS, payload: response.data });
//     }
//   } catch (error) {
//     dispatch({ type: CREATE_STORE_FAILURE, payload: error });
//   }
// };

// export const uploadImages = (formData) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3001/images/upload",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     if (response.data) {
//       toast.success(t("toast.uploadTrue"));
//       dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response.data.links });
//     }
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     dispatch({
//       type: UPLOAD_IMAGES_FAILURE,
//       payload: "Error uploading images",
//     });
//   }
// };
// //FILTER

// export const filterProducts = (filters) => {
//   const endpoint = "http://localhost:3001/product/filter";
//   return async (dispatch) => {
//     try {
//       const queryString = new URLSearchParams(filters).toString();
//       const response = await axios.get(`${endpoint}?${queryString}`);
//       console.log(response.data);
//       return dispatch({
//         type: GET_PRODUCT_FILTER,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const orderProductsAbc = (vector) => ({
//   type: SHOW_ABC,
//   payload: vector,
// });

// export const orderProductsPrice = (price) => ({
//   type: SHOW_PRICE,
//   payload: price,
// });

// export const clearFilteredProducts = () => ({
//   type: CLEAR_FILTERED_PRODUCTS,
// });

// export const clearProductsByStore = () => ({
//   type: CLEAR_PRODUCTS_STORE,
// });

// export const renderCondition = (condition) => ({
//   type: SET_CONDITION,
//   payload: condition,
// });

// //CARRITO

// export const addToCart = (product) => ({
//   type: ADD_TO_CART,
//   payload: product,
// });

// export const removeFromCart = (productId) => ({
//   type: REMOVE_FROM_CART,
//   payload: productId,
// });

// export const cleanCart = () => ({
//   type: CLEAN_CART,
// });

// export const updateCartItemQuantity = (productId, quantity) => ({
//   type: UPDATE_CART_ITEM_QUANTITY,
//   payload: { productId, quantity },
// });

// export const sendCart = (userId, cartItems) => async (dispatch) => {
//   console.log(userId, cartItems);
//   try {
//     if (userId) {
//       const data = {
//         idUser: userId, // Ajusta el nombre de la propiedad a "idUser"
//         arrayProducts: cartItems.map((product) => ({
//           id_product: product.id_product,
//           cartQuantity: product.cartQuantity,
//         })),
//       };
//       // Realizar la petición POST
//       const response = await axios.post("http://localhost:3001/cart/", data);
//       // Despachar una acción si es necesario
//       console.log(response);
//       dispatch({ type: CART_SENT_SUCCESS, payload: response });
//     } else {
//       console.log("No user is logged in.");
//     }
//   } catch (error) {
//     console.error("Error sending cart:", error);
//     dispatch({ type: CART_SENT_FAILURE, error });
//   }
// };

// export const getCartByUserId = (userId) => async (dispatch) => {
//   console.log(userId);
//   try {
//     // Realizar la petición GET para obtener la información del carrito del usuario
//     const response = await axios.get(`http://localhost:3001/cart/id/${userId}`);
//     console.log(response.data.products);
//     // Despachar una acción con la información del carrito obtenida
//     dispatch({ type: GET_CART_SUCCESS, payload: response.data.products });
//   } catch (error) {
//     // En caso de error, despachar una acción de error
//     console.error("Error al obtener el carrito:", error);
//     dispatch({ type: GET_CART_FAILURE, error });
//   }
// };

// //PAGOS
// export const paymentOk = (payment) => {
//   return async () => {
//     try {
//       console.log(payment);
//       const response = await axios.post(
//         "http://localhost:3001/paying/post-order",
//         payment
//       );
//       console.log(response);

//       if (response.status === 200) {
//         toast.success(t("toast.paymentTrue"))
//       } 
//     } catch (error) {
//       toast.error(t("toast.toastPaymentFalse"));
//       console.log(error.message);
//     }
//   };
// };


// export const updateDeliveryMethod = (delivery) => {
//   return (dispatch) => {
//     dispatch({
//       type: UPDATE_DELIVERY,
//       payload: delivery,
//     });
//   };
// };

