import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  IS_AUTH,
  ISNT_AUTH,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_FACEBOOK,
  LOGOUT,
  UPDATE_USER
} from "../Actions/authActions";

const initialState = {
  user: {},
  isAuth: false,
  registering: false,
  registerError: null,
  loginError: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registering: true };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: payload, user: payload };

    case IS_AUTH:
      // Guardar la información del usuario en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(payload));
      // Actualizar el estado global
      return { ...state, isAuth: true, user: payload };

    case ISNT_AUTH:
      // Eliminar la información del usuario del sessionStorage
      sessionStorage.removeItem("user");
      // Actualizar el estado global
      return { ...state, isAuth: false, user: {} };

    case LOGOUT:
      return { ...state, isAuth: false, user: {} };

    case LOGIN_WITH_GOOGLE:
      return { ...state, isAuth: true, user: payload };

    case LOGIN_WITH_FACEBOOK:
      return { ...state, isAuth: true, user: payload };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
