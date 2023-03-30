import axios from "axios";
import { add_cookie_items, getCookie, remove_cookie_items } from "./utitlty";
import {
  ADD_TO_CART,
  GET_ORDERS,
  VISITOR_ADD_ITEM_TO_CART,
  REMOVE_FROM_CART,
  VISITOR_REMOVE_ITEM_FROM_CART,
  CARTMESSAGE,
  CLEARCARTMESSAGE,
} from "../ActionTypes/ActionTypes";
import { checkAuthTimeout } from "./AUTHAction";
import { toast } from "react-toastify";

export const get_orders = () => (dispatch, getState) => {
 
  if (getState().AuthReducer.authenticated) {
    dispatch(checkAuthTimeout())
    const url = "https://misfit.onrender.com/order/UserCart";
    axios
      .get(url, tokenConfig(getState))
      .then((res) => {
        const payload = {
          total_amount_of_all_goods_bought:
            res.data.total_amount_of_all_goods_bought,
          total_number_of_products: res.data.total_number_of_products,
          orders: res.data.orders,
        };
        dispatch({
          type: GET_ORDERS,
          payload,
        });
      })
  } else {
    var cart = JSON.parse(getCookie("cart"));
    if (cart == undefined) {
      cart = [];
      document.cookie = "cart=" + JSON.stringify(cart) + ";domain;path=/";
    } else {
      let sumQuantity = 0;
      let sum_of_amount = 0;
      for(let i =  0; i < cart.length; i++){
        sum_of_amount += cart[i].product.stock_price
      }
      for(let i =  0; i < cart.length; i++){
        sumQuantity += cart[i].quantity
      }
      

      const payload = {
        total_amount_of_all_goods_bought: sum_of_amount,
        total_number_of_products: sumQuantity,
        orders: cart,
      };
      dispatch({
        type: GET_ORDERS,
        payload,
      });
    }
  }
  
};

export const tokenConfig = (getState) => {
  const token = getState().AuthReducer.access_token;
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

export const add_to_cart = (id) => (dispatch, getState) => {

  dispatch(checkAuthTimeout())
  axios
    .get(`https://misfit.onrender.com/order/AddorDelete/${id}`, tokenConfig(getState))
    .then((res) => {
      //(res)
      const payload = {
        total_amount_of_all_goods_bought:
          res.data.total_amount_of_all_goods_bought,
        total_number_of_products: res.data.total_number_of_products,
        orders: res.data.orders,
      };
      toast.success("Added To Cart")
      dispatch({
        type: ADD_TO_CART,
        payload,
      });
      dispatch({
        type: CARTMESSAGE,
        payload: "ADDED TO CART"
      })
      setTimeout(() => dispatch({
        type: CLEARCARTMESSAGE
      }), 5000)
    })
    
    .catch((res) => console.log(res))
};

export const remove_from_cart = (id) => (dispatch, getState) => {
  dispatch(checkAuthTimeout())
  axios
    .delete(
      `https://misfit.onrender.com/order/AddorDelete/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      const payload = {
        total_amount_of_all_goods_bought:
          res.data.total_amount_of_all_goods_bought,
        total_number_of_products: res.data.total_number_of_products,
        orders: res.data.orders,
      };
      dispatch({
        type: REMOVE_FROM_CART,
        payload,
      });
    });
    dispatch({
      type: CARTMESSAGE,
      payload: "REMOVED FROM CART"
    })
    toast.info("REMOVED FROM CART")
};

export const visitor_add_to_cart =(Product_id,product_stock_price,productname,productimage,product_category) =>(dispatch) => {
   
    add_cookie_items(
      Product_id,
      product_stock_price,
      productname,
      productimage,
      product_category
    )

    var cart = JSON.parse(getCookie("cart"));
   
    let sumQuantity = 0;
    let sum_of_amount = 0;

    for(let i = 0; i < cart.length; i++){
      sum_of_amount += cart[i].product.stock_price
    }
    for(let i =  0; i < cart.length; i++){
      sumQuantity += cart[i].quantity
    }

    const payload = {
      total_amount_of_all_goods_bought: sum_of_amount,
      total_number_of_products: sumQuantity,
      orders: cart,
    };
    dispatch({
      type: VISITOR_ADD_ITEM_TO_CART,
      payload,
    });
    dispatch({
      type: CARTMESSAGE,
      payload: "ADDED TO CART"
    })

    setTimeout(() => dispatch({
      type: CLEARCARTMESSAGE
    }), 5000)
  };



  
export const visitor_remove_from_cart =
  (
    Product_id,
    product_stock_price,
    productname,
    productimage,
    product_category
  ) =>
  (dispatch, getState) => {
    remove_cookie_items(
      Product_id,
      product_stock_price,
      productname,
      productimage,
      product_category
    );
    var cart = JSON.parse(getCookie("cart"));
    //(cart)
    let sumQuantity = 0;
    let sum_of_amount = 0;

    for(let i =  0; i < cart.length; i++){
      sum_of_amount += cart[i].product.stock_price
    }
    for(let i =  0; i < cart.length; i++){
      sumQuantity += cart[i].quantity
    }


    const payload = {
      total_amount_of_all_goods_bought: sum_of_amount,
      total_number_of_products: sumQuantity,
      orders: cart,
    };
    dispatch({
      type: VISITOR_REMOVE_ITEM_FROM_CART,
      payload,
    });
    dispatch({
      type: CARTMESSAGE,
      payload: "REMOVE FROM CART"
    })
    setTimeout(() => dispatch({
      type: CLEARCARTMESSAGE
    }), 5000)

  };