

const initialState= {
    
}

const rootReducer= (state=initialState, action)=>{

    const {type, payload}= action; //destructuring del parametro action

    switch (type) {
        
    
        default:
            return state;
    }
}

export default rootReducer;