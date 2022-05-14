import axios from "axios";
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAIL, LOGOUT} from "../ActionTypes/ActionTypes";
import { tokenConfig } from "./OrderAction";


export const auth = (payload, islogin) => (dispatch) => {
    // console.log(payload)
    dispatch({
        'type': AUTH_LOADING
    })
    let url = '';
    if(islogin){
        url = 'https://misfitbackend.herokuapp.com/auth/login'
    }
    else{
        url = 'https://misfitbackend.herokuapp.com/auth/register'
    }
    axios.post(url, payload)
    .then((res) => {
        localStorage.setItem('access', res.data.access)
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data.user
        })
    })
}




export const load_user = () => (dispatch, getState) => {
    dispatch({'type': AUTH_LOADING})
    axios.get('http://127.0.0.1:8000/auth/get_user', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
        console.log(getState().AuthReducer.authenticated)
    })
    .catch((err) => {
        dispatch({
            type : AUTH_FAIL,
        })
    })
}

export const UserLogout = () => (dispatch, getState) => {
    dispatch({'type': LOGOUT})
    axios.get('http://127.0.0.1:8000/auth/logout', tokenConfig(getState))
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}