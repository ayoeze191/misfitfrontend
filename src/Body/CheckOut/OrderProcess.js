import axios from "axios";
import { RESETORDER } from "../../Store/ActionTypes/ActionTypes";
import Store from "../../Store/Store";

export const processOrder = (payload) => (dispatch) => {
    if(Store.getState().AuthReducer.authenticated){

        const data = {
            shipping_data: payload,
            // order: Store.getState().OrderReducer.authenticated
        }
        axios.post('https://misfitbackend.herokuapp.com/order/processOrder', data, getToken())
        .then((res) => {
        console.log(res.data)
    })
    }
    
    else{
        const data = {
            shipping_data: payload,
            order: Store.getState().OrderReducer.orders
        }
        axios.post('https://misfitbackend.herokuapp.com/order/processOrder', data)
        .then((res) => {
            const cart = []
            document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
            dispatch({type: RESETORDER})
            
    })
    .catch((err) => {
      console.log(err)
    })
    }
}

export const getToken = () => {
    const token = Store.getState().AuthReducer.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  
    return config;
  };