import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS } from "../ActionTypes/ActionTypes";

const initial_state = {
    allProducts: [],
    productDetails: {
        "id": 0,
        'name': "",
        "category": "",
        "description": "",
        "stock_price": "",
        "productimage": []
    },
}

const ProductReducer = (state = initial_state, action) => {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            }
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload
            }
            
        
    default:
            return state;
    }   
}

export default ProductReducer

