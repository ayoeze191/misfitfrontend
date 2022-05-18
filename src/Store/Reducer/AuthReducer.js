import { AUTH_FAIL, AUTH_SUCCESS, AUTH_LOADING, LOGOUT} from "../ActionTypes/ActionTypes"

const initial_state = {
    user: '',
    loading: false,
    authenticated : false,
    access_token: localStorage.getItem('access'),
    refresh_token: localStorage.getItem('refresh')
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
            const newrefresh = localStorage.getItem('refresh')
            return(
                {
                    ...state,
                    loading: false,
                    access_token: newtoken,
                    refresh_token: newrefresh,
                    authenticated: true,
                    user: action.payload
                }
            )

        case AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('exp')
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

