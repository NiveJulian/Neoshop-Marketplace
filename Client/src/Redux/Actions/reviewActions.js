import axios from "axios";
import toast from "react-hot-toast";
import rutaBack from "./rutaBack";
export const NEW_REVIEW = "NEW_REVIEW";
export const NEW_REVIEW_FAILURE = "NEW_REVIEW_FAILURE";
export const GET_ALL = "GET_ALL";
export const ALL_PAYMENTS = "ALL_PAYMENTS";

export const sendReview = (reviewInfo) => async (dispatch) => {
  try { 
    const response = await axios.post( `${rutaBack}/review/`, reviewInfo);
    if (response.data) {
      // toast.success("Upload review success");
      dispatch({ type: NEW_REVIEW, payload: response.data.info });
    }
  } catch (error) {
    console.log("error en review actions", error)
    dispatch({
      type: NEW_REVIEW_FAILURE,
      payload: "Error uploading review",
    });
  }
}; 

  export const getPaymentsByUserId = (id_user) => {
    const endpoint = `${rutaBack}/paying/user/${id_user}`;
    return async (dispatch) => {
      try {
        let response = await axios.get(endpoint);
        return dispatch({
          type: ALL_PAYMENTS,
          payload: response.data,
        });
      } catch (error) {
        console.log("Error al traer los pagos desde el back",error)
        console.log(error.message);
      }
    };
  };