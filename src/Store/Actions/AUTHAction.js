import { data } from "autoprefixer";
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
        url = 'http://127.0.0.1:8000/auth/login'
    }
    else{
        url = 'http://127.0.0.1:8000/auth/register'
    }
    axios.post(url, payload)
    .then((res) => {
        const payload = {
            'access': res.data.access,
            'refresh': res.data.refresh
        }
        localStorage.setItem('access', payload.access)
        localStorage.setItem('refresh', payload.refresh)
        localStorage.setItem('exp', res.data.exp)
        dispatch({
            type: AUTH_SUCCESS,
            payload
        })
    })
}



export const checkAuthTimeout = () => (dispatch) => {
    const exp = new Date(localStorage.getItem('exp') * 1000 )
    const presentDate = new Date()
    if(presentDate >= exp) {
        axios.post('http://127.0.0.1:8000/auth/get_new_token', localStorage.getItem('exp'))
        .then((res) => {
            const payload = {
                'access': res.data.access,
                'refresh': res.data.refresh
            }
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            localStorage.setItem('exp', res.data.exp)
            dispatch({
                type: AUTH_SUCCESS,
                payload
            })
        })
    }
}






export const load_user = () => (dispatch, getState) => {
    dispatch({'type': AUTH_LOADING})
    axios.get('http://127.0.0.1:8000/auth/get_user', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
        dispatch(checkAuthTimeout())
        
    })
    .catch((err) => {
        dispatch({
            type : AUTH_FAIL,
        })
    })
}

export const UserLogout = () => (dispatch, getState) => {
    dispatch({'type': LOGOUT})
    const refresh = localStorage.getItem('refresh') 
    axios.post('https://misfitbackend.herokuapp.com/auth/logout', tokenConfig(getState), data = refresh)
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}