import { applyMiddleware, createStore, compose } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "../Reducer/Reducer";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//pasar reducer config file como argumento
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;