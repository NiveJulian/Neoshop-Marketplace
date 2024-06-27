import axios from "axios";
import toast from "react-hot-toast";
import rutaBack from "./rutaBack";

export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const uploadImages = (formData,t) => async (dispatch) => {
    try { 
      const response = await axios.post(
        `${rutaBack}/images/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data) {
        toast.success(t("toast.imageTrue"));
        dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response.data.links });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      dispatch({
        type: UPLOAD_IMAGES_FAILURE,
        payload: "Error uploading images",
      });
    }
  };