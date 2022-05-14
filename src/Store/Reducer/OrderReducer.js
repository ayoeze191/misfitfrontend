import { GET_ORDERS, ADD_TO_CART, VISITOR_TO_CART, VISITOR_ADD_ITEM_TO_CART, REMOVE_FROM_CART, VISITOR_REMOVE_ITEM_FROM_CART, RESETORDER} from "../ActionTypes/ActionTypes";

const initial_state = {
    "total_amount_of_all_goods_bought": null,
    "total_number_of_products": null,
    "orders": []
}


export const OrderReducer = (state = initial_state, action) => {
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                total_amount_of_all_goods_bought: action.payload.total_amount_of_all_goods_bought,
                total_number_of_products: action.payload.total_number_of_products,
                orders: action.payload.orders
            }
        case ADD_TO_CART:
        case REMOVE_FROM_CART:
            const new_total_amount_of_all_goods_bought = action.payload.total_amount_of_all_goods_bought
            const new_total_number_of_products = action.payload.total_number_of_products
            const new_orders = action.payload.orders
            return{
                ...state,
                total_amount_of_all_goods_bought: new_total_amount_of_all_goods_bought,
                total_number_of_products: new_total_number_of_products,
                orders: new_orders
            }

        case VISITOR_TO_CART:
            const visitor_new_total_amount_of_all_goods_bought = action.payload.total_amount_of_all_goods_bought
            const visitor_total_number_of_products = action.payload.total_number_of_products
            const visitor_orders = action.payload.orders
            return {
                ...state,
                "total_amount_of_all_goods_bought": visitor_new_total_amount_of_all_goods_bought,
                "total_number_of_products": visitor_total_number_of_products,
                "orders": visitor_orders
            }
        case VISITOR_ADD_ITEM_TO_CART:
        case VISITOR_REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                "total_amount_of_all_goods_bought": action.payload.total_amount_of_all_goods_bought,
                "total_number_of_products": action.payload.total_number_of_products,
                "orders": action.payload.orders
            }
        
        case RESETORDER:
            return{
                "total_amount_of_all_goods_bought": null,
                "total_number_of_products": null,
                "orders": []
            }    
        default:
            return state
    }
}