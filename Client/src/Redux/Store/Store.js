import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import authReducer from '../Reducer/authReducer';
import cartReducer from '../Reducer/cartReducer';
import payReducer from '../Reducer/payReducer';
import productReducer from '../Reducer/productReducer';
import storeReducer from '../Reducer/storeReducer';
import updateImageReducer from '../Reducer/updateImageReducer';
import reviewsReducer from '../Reducer/reviewReducer';
import themesReducer from '../Reducer/themesReducer';
import favoritesReducer from "../Reducer/favoritesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  pay: payReducer,
  product: productReducer,
  store: storeReducer,
  updateImage: updateImageReducer,
  reviews: reviewsReducer,
  themes: themesReducer,
  favorites: favoritesReducer,
});




const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//pasar reducer config file como argumento
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;