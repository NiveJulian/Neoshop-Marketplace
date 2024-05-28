import axios from "axios";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


export const register = (formData) => async(dispatch) => {
    const endpoint = 'http://localhost:3001/'

    try {
        const response = await axios.post(`${endpoint}`, formData);

        if(response.status === 201){
            dispatch({type: REGISTER_SUCCESS})
        }
    } catch (error) {
        console.log(error)
    }
}