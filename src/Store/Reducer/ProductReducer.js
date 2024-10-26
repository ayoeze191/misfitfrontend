import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS, QUERYING,PRODUCTS_LOADING, SEARCH_FEATURES } from "../ActionTypes/ActionTypes";

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
    productLoading: false,
    query: ""
}

const ProductReducer = (state = initial_state, action) => {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                productLoading: false
            }
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload,
                productLoading: false
            }
        case PRODUCTS_LOADING:
            return{
                ...state,
                productLoading: true
            }
        case QUERYING:
            return {
                ...state,
                query: action.payload
            }
    default:
            return state;
    }   
}

export default ProductReducer

