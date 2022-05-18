import { data } from "autoprefixer";
import axios from "axios";
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAIL, LOGOUT, CARTMESSAGE, AUTHMESSAGE, CLEARCARTMESSAGE} from "../ActionTypes/ActionTypes";
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
    .catch((err) => {
        console.log(err.response.data)
        if(typeof(err.response.data.error) == 'string'){
            dispatch({
                type: AUTHMESSAGE,
                payload: err.response.data.error
              })
            dispatch({
                type: AUTH_FAIL,
            })
            setTimeout(() => dispatch({
                type: CLEARCARTMESSAGE
              }), 5000)
        }
        else
            if(err.response.data.email){
                
                dispatch(
                    {type: AUTHMESSAGE,
                    payload: err.response.data.email.join('and')
                    })
                    dispatch({
                        type: AUTH_FAIL,
                    })   
                setTimeout(() => dispatch({
                        type: CLEARCARTMESSAGE
                      }), 5000)
            }
            else
            if(err.response.data.password){
                
                dispatch(
                    {type: AUTHMESSAGE,
                    payload: err.response.data.password.join('and')
                    })
                    dispatch({
                        type: AUTH_FAIL,
                    })   
                setTimeout(() => dispatch({
                        type: CLEARCARTMESSAGE
                      }), 5000)
            }
        
            else{
                dispatch(
                    {type: AUTHMESSAGE,
                    payload: err.response.data.non_field_errors.join('and')
                    })
                dispatch({
                        type: AUTH_FAIL,
                    })   
                setTimeout(() => dispatch({
                        type: CLEARCARTMESSAGE
                      }), 5000)
            }
            
        

            
        
        
        
    })
}



export const checkAuthTimeout = () => (dispatch, getState) => {
    
    const exp = new Date(localStorage.getItem('exp') * 1000 )
    const data  = { refresh: localStorage.getItem('refresh')}
    console.log("expires", exp)
    const presentDate = new Date()
    console.log("now",presentDate)
    if(presentDate >= exp) {
        axios.post('https://misfitbackend.herokuapp.com/auth/get_new_token', data, tokenConfig(getState))
        .then((res) => {
            console.log(res)
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
    else{
        console.log('not greater')
    }
}






export const load_user = () => (dispatch, getState) => {
    dispatch({'type': AUTH_LOADING})
    axios.get('https://misfitbackend.herokuapp.com/auth/get_user', tokenConfig(getState))
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
    axios.post('https://misfitbackend.herokuapp.com/auth/logout', tokenConfig(getState), refresh)
    .then((res) => {
        console.log(res.data)
        dispatch({
            type : AUTH_FAIL,
        })
    })
    .catch((err) => {
        
    })
}