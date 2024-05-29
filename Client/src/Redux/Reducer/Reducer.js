import { GET_ALL } from "../Actions/Actions";


const initialState= {
 allProducts:[],   
}

const rootReducer= (state=initialState, action)=>{

    const {type, payload}= action; //destructuring del parametro action

    switch (type) {
        case GET_ALL:
            return {...state,  allProducts: payload}
        
    
        default:
            return state;
    }
}

export default rootReducer;