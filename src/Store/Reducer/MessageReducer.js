import { CARTMESSAGE, CLEARCARTMESSAGE, AUTHMESSAGE } from "../ActionTypes/ActionTypes"


const initial_state = {
    cartMessage : "",
    authmessage: ''   
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
                cartMessage: "",
                authmessage: ''
            }

        case AUTHMESSAGE:
            return{
                ...state,
                authmessage: action.payload
            }
        


        
        default:
            return state
    }
}

