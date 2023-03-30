// import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS, PRODUCTS_LOADING } from "../ActionTypes/ActionTypes";
import axios from "./../../axios"
export const GET_PRODUCTS = (products) => {
    return {
        "type": GET_ALL_PRODUCTS,
        "payload": products
     } 
}



export const get_all_products = () => (dispatch) => {
    dispatch({'type': PRODUCTS_LOADING})
    axios.get('https://misfit.onrender.com/products')
    .then((res) => {
        // console.log(res.data)
        dispatch(GET_PRODUCTS(res.data))
    })
}  

export const get_product_details = (id) => (dispatch) => {
    axios.get(`https://misfit.onrender.com/productDetails/${id}`)
    .then((res) => {
        // console.log(res)
        dispatch({"type": GET_PRODUCT_DETAILS, payload: res.data})
    })
}


export const product_search_action = (payload) => (dispatch) => {
    dispatch({'type': PRODUCTS_LOADING})
    axios.get(`https://misfit.onrender.com/productSearch?search=${payload}`)
    .then((res) => {
        dispatch(GET_PRODUCTS(res.data))
    })
}


