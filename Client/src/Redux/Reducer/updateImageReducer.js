import {
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
} from "../Actions/updateImageActions";

const initialState = {
  images: [],
  error: null,
};

const uploadImageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, payload],
        error: null,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default uploadImageReducer;
