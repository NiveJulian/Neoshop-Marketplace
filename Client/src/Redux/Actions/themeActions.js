export const CHANGE_THEME = "CHANGE_THEME";
export const GET_THEME = "GET_THEME";

export const changeTheme = (theme) => (dispatch) => {
    dispatch({ type: CHANGE_THEME, payload: theme });
};


