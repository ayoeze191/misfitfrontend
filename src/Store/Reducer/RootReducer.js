import { combineReducers } from "redux";
import ProductReducer  from './ProductReducer.js';
import { AuthReducer } from "./AuthReducer.js";
import { OrderReducer } from "./OrderReducer.js";
import { MessageReducer } from "./MessageReducer.js";

export default combineReducers({
    ProductReducer,
    AuthReducer,
    OrderReducer,
    MessageReducer
})