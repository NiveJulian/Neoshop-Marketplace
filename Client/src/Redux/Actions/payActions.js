import axios from "axios";
import toast from "react-hot-toast";
import rutaBack from "./rutaBack"
import { createHtml } from "../../components/Mails/createHtml";

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

export const mailPayOk = (userMail, paymentDetail) => {
  return async () => {
    const emailContent = {
      emailUser: userMail,
      message: createHtml(paymentDetail)
    };

    try {
      console.log(emailContent);
      const response = await axios.post(`${rutaBack}/mails`,emailContent);
      console.log (response);
      return response;
    } catch (error) {
      console.error("Error al enviar el correo:", error.message);
    }
  }
}
