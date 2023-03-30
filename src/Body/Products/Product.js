import React from "react";
import CartLock from "./../../assets/materials/CartLock.png";
import Person from "./../../assets/materials/Person.svg";
import like from "./../../assets/materials/like.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, visitor_add_to_cart } from "../../Store/Actions/OrderAction";

const Product = (props) => {
  const whether_authenticated = useSelector((state) => state.AuthReducer.authenticated)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const ToProductDetail = () => {
  
    const tos = `/products/${props.id}`;
    navigate(tos);
  };


  const addTocart = (id, price, name, image, category) => {
    const d_image = `${image}`
    if(whether_authenticated){
      dispatch(add_to_cart(id))
    }
    else{
      dispatch(visitor_add_to_cart(id, price, name, d_image, category))
    }
  };
  // props.name props.stock_price

  return (
    <div className=" shadow-lg shadow-stone-500 p-3" >
      <div className="flex flex-col gap-3">
        <div>
        <img src={props.productimage} className="h-full w-full " />{" "}
        </div>
        <h5 className="text-capitalize text-left font-poppins_Regular font-semibold">{props.name}</h5>
        </div>
        <div className="flex border-t p-3 pl-0 justify-between items-center">
          <div className="flex gap-1">
            <button className="p-3 border border-green-300 hover:bg-discover hover:text-yellow-50" onClick={() => addTocart(props.id,
               props.stock_price, props.name,
                props.productimage, 
                props.category.title)}>Add To Cart</button>
            <button className="p-3 border-discover border hover:bg-discover hover:text-yellow-50"  onClick={ToProductDetail}>View</button>
          </div>
          <div>
            ${props.stock_price}
          </div>
        </div>
     
      
    </div>
  );
};
export default Product;
