import React from "react";
import Person from "./../../../../assets/materials/Person.svg";
import arrowdown from "./../../../../assets/materials/arrowdown.png";
import arrowup from "./../../../../assets/materials/arrowup.png";
import { add_to_cart, visitor_add_to_cart, remove_from_cart, visitor_remove_from_cart } from "../../../../Store/Actions/OrderAction";
import { useDispatch } from "react-redux";


const CartComponents = (props) => {
  const dispatch = useDispatch();

  let image = props.image
  if(props.authenticated){
    image = props.image
  }

  const addTocart = (id, price, name, image, category) => {
    
    if(props.authenticated){
      dispatch(add_to_cart(id))
    }
    else{
      dispatch(visitor_add_to_cart(id, price, name, image, category))
    }
  };

  const removefromcart = (id, price, name, image, category) => {
    const d_image = image
    if(props.authenticated){
      dispatch(remove_from_cart(id))
    }
    else{
      dispatch(visitor_remove_from_cart(id, price, name, d_image, category))
    }
  }

  return (
    <tr className="border border-x-0 font-poppins_Regular ">

      <td className="rounded-2xl object-fill h-32 md:h-24 p-3 box-content md:table-cell block ">
        <img src={image} className="h-full rounded-2xl mx-auto " />
      </td>
      
        <td className=" md:after:hidden before:content-['category:'] flex justify-between md:table-cell md:before:hidden md:text-left md:border-y-0 py-3 before:text-slate-300" data-label = "category"> {props.category}</td>
        <td data-label = "name" className="flex justify-between md:table-cell  before:content-['Name:'] md:before:hidden md:border-y-0 py-3 before:text-slate-300"> {props.name}</td>
        <td data-label = "size "  className="flex justify-between md:table-cell before:text-slate-300  before:content-['Size:'] md:before:hidden   md:border-y-0 py-3 ">M</td>
        <td data-label = "price " className="flex justify-between md:table-cell  before:content-['Price:'] md:before:hidden md:border-y-0 py-3 before:text-slate-300">{`$${props.stock_price}`}</td>
        <td className="flex justify-between md:table-cell  before:content-['Quantity:'] md:before:hidden md:border-y-0 py-3 before:text-slate-300 ">
        
          <span className="flex gap-1 justify-center"> 
          {props.quantity} 
          <div className="flex flex-col gap-2">
            <div className="h-3 w-4">
            <img src={arrowdown} className= "w-full h-full rotate-180" onClick={() => addTocart(props.id,
               props.stock_price, props.name,
                image, 
                props.category)}/>
            </div>
            <div className="h-3 w-4 rotate-180">
            <img src={arrowup} onClick={() => removefromcart(props.id,
               props.stock_price, props.name,
                image,
                props.category)}/>
            </div>
            </div>
         
          </span> 
         
        </td>

{/*        
        <td>
          <img src="" />
        </td> */}
    </tr>
  );
};

export default CartComponents;
