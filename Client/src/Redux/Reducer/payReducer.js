import { UPDATE_DELIVERY } from "../Actions/payActions";

const initialState = {
  delivery: "",
};

const payReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
      case UPDATE_DELIVERY:
      console.log("Reducer received payload:", payload); // Log para verificar el payload
      return {
        ...state,
        delivery: payload,
      };
    
    default:
      return state;
  }
};

export default payReducer;
