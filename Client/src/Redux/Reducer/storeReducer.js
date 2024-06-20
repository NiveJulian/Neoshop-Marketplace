import {
  GET_SELLER_BY_ID,
  GET_ALL_STORE,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAILURE,
  GET_SELLER_BY_NAME,
} from "../Actions/storeActions";

const initialState = {
  store: [],
  seller: {},
};

const storeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
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

    case GET_SELLER_BY_ID:
      return {
        ...state,
        seller: payload,
      };
    case GET_SELLER_BY_NAME:
      return {
        ...state,
        seller: payload,
      };
    default:
      return state;
  }
};

export default storeReducer;
