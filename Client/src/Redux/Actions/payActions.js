import axios from "axios";
import toast from "react-hot-toast";
import rutaBack from "./rutaBack"

export const UPDATE_DELIVERY = "UPDATE_DELIVERY";

export const paymentOk = (payment) => {
  return async () => {
    try {
      console.log(payment);
      const response = await axios.post(
        `${rutaBack}/paying/post-order`,
        payment
      );

      if (response.status === 200) {
        toast.success("Payment Ok");
      }
    } catch (error) {
      toast.error("Error sending payment");
      console.log(error.message);
    }
  };
};

export const updateDeliveryMethod = (delivery) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DELIVERY,
      payload: delivery,
    });
  };
};
