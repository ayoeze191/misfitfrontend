import { AUTH_FAIL, AUTH_SUCCESS, AUTH_LOADING, LOGOUT} from "../ActionTypes/ActionTypes"

const initial_state = {
    user: '',
    loading: false,
    authenticated : false,
    token: localStorage.getItem('access')
}
export const AuthReducer = (state = initial_state, action) => {
    switch(action.type){
        case AUTH_LOADING:
        return(
            {
            ...state,
            loading: true
            }
        )
        case AUTH_SUCCESS:
            const newtoken = localStorage.getItem('access')
            return(
                {
                    ...state,
                    loading: false,
                    token: newtoken,
                    authenticated: true,
                    user: action.payload
                }
            )

        case AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            return(
                {
                    ...state,
                    loading: false,
                    user: '',
                    authenticated: false,
                    token: null
                }
            ) 
        default:
            return state
    }
}

