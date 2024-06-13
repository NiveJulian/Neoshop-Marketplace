import axios from "axios";
import toast from "react-hot-toast";

export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const uploadImages = (formData) => async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data) {
        toast.success("Upload image success");
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