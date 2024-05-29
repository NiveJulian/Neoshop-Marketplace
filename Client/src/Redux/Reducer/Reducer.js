import { CLEAR_FILTERED_PRODUCTS, GET_ALL, SET_CONDITION, SHOW_CATEGORY } from "../Actions/Actions";


const initialState= {
 allProducts:[],
 filteredProducts:[],
 condition: "allProducts"  
}

const rootReducer= (state=initialState, action)=>{

    const {type, payload}= action; //destructuring del parametro action

    switch (type) {
        case GET_ALL:
            return {...state,  allProducts: payload}

        case SHOW_CATEGORY:
            return {...state, filteredProducts: state.allProducts.filter(product => product.category.includes(payload))}

        case CLEAR_FILTERED_PRODUCTS:
            return {...state, filteredProducts:[]};    
        
        case SET_CONDITION:
            return {...state, condition:payload}    
        
    
        default:
            return state;
    }
}

export default rootReducer;