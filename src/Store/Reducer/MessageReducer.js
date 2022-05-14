import { CARTMESSAGE, CLEARCARTMESSAGE } from "../ActionTypes/ActionTypes"


const initial_state = {
    cartMessage : ""   
}


export const MessageReducer = (state = initial_state, action) => {
    switch(action.type){
        case CARTMESSAGE:
            return{
                ...state,
                cartMessage: action.payload
            }
        case CLEARCARTMESSAGE:
            return{
                cartMessage: ""
            }
        
        default:
            return state
    }
}

