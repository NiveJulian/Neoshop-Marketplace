import {
  NEW_REVIEW,
  NEW_REVIEW_FAILURE,
  GET_ALL,
  ALL_PAYMENTS,
} from "../Actions/reviewActions"; //Importamos las acciones

const initialState = {
  allReviews: [],
  error: null,
  allPayments:null,
};

const reviewReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL:
      return { ...state, allReviews: payload };

    case NEW_REVIEW:
      return { ...state, allReviews: payload };

    case NEW_REVIEW_FAILURE:
      return { ...state, error: payload };

    case ALL_PAYMENTS:
      return { ...state, allPayments: payload };

    default:
      return state;
  }
};

export default reviewReducer;
