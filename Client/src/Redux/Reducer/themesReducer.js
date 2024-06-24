import {
    CHANGE_THEME,
  } from "../Actions/themeActions"; //Importamos las acciones
  
  const initialState = {
    theme: 'light',
  };
  
  const themesReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CHANGE_THEME:
        return { ...state, theme: payload };
      default:
        return state;
    }
  };
  
  export default themesReducer;
  