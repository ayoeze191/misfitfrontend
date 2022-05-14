import React, { useEffect, useState } from "react";
import CheckOutSummary from "./checkOutSummary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { processOrder } from "./OrderProcess";
import { useDispatch } from "react-redux";

const CheckOut = () => {
  const dispatch = useDispatch()
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const total = useSelector((state) => state.OrderReducer.total_amount_of_all_goods_bought)
  const [ShippingDetails, setShippingDetails] = useState({
    total: null,
    shipping_info: {
        address: "",
        state: "",
        city: "",
        zipcode: ""
    },
    user_info: {
      name: "",
      email: ""
    }
  })

  useEffect(() => {
    const newState = ShippingDetails
    newState['total'] = total
    setShippingDetails(newState)
  })


  const onChangeHandler = (e, type) => {

    if(type == 'shippingdetails')
    {
     
      const newState = ShippingDetails
      newState["shipping_info"][e.target.name] = e.target.value
      setShippingDetails(newState)
    }
   
    else{
      const newState = ShippingDetails
      newState["user_info"][e.target.name] = e.target.value
      setShippingDetails(newState)
    }
  } 
  const makePaymentHandler = (e) => {
    e.preventDefault()
    dispatch(processOrder(ShippingDetails))
  }


  const products = useSelector((state) => state.OrderReducer.orders);
  const detail = useSelector((state) => state.OrderReducer);
  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );
  let body = null
  body = products.map((product) => (
    <CheckOutSummary
      name={product.product.name}
      quantity={product.quantity}
      stock_price={product.product.stock_price}
      image={product.product.productimage[0]}
      authenticated = {whether_authenticated}
    />
  ));



  return (
    <div className="flex max-w-5xl mx-auto justify-between gap-4 mt-4 bg-white flex-col md:flex-row">
      <form className="flex flex-col gap-5 shadow-lg shadow-stone-500 p-5 h-fit" onSubmit={(e)  => makePaymentHandler(e)}>

        <div className="flex flex-col gap-5">
        {!whether_authenticated&&
          <div className="flex justify-between gap-5 border-b pb-3 flex-col md:flex-row w-full">
            <div className="w-full">
              <input type="text" placeholder="Name" className="border p-2 w-full" name = "name" onChange={(e) => onChangeHandler(e, null)}/>
            </div>
            <div>
              <input type="email" placeholder="Email" className="border p-2 w-full" name = "email" onChange={(e) => onChangeHandler(e, null)}/>
            </div>
          </div>
}
          <div className="w-full text-left">Shipping Information:</div>

          <div className="gap-3 w-full items-start grid grid-cols-1 sm:grid-cols-2">
            <div>
              <input type="text" placeholder="Address" className="border p-2 w-full md:w-fit" name = "address" onChange={(e) => onChangeHandler(e, "shippingdetails")}/>
            </div>
            <div>
              <input type="text" placeholder="state" className="border p-2 w-full md:w-fit"  name = "state" onChange={(e) => onChangeHandler(e, "shippingdetails")}/>
            </div>
            <div>
              <input type="text" placeholder="city" className="border p-2 w-full md:w-fit" name = "city" onChange={(e) => onChangeHandler(e, "shippingdetails")}/>
            </div>
            <div>
              <input type="text" placeholder="zipCode" className="border p-2 w-full md:w-fit" name = "zipcode" onChange={(e) => onChangeHandler(e, "shippingdetails")}/>
            </div>
          </div>
          <div className="w-full bg-discover p-3 text-white font-poppins_Regular">
          <button className="w-full" onClick={(e) => {
              e.preventDefault()
              setShowPaymentOptions(!showPaymentOptions)
              }}>Continue</button>
        </div>
        </div>


        
    {showPaymentOptions&&
        <div className="flex items-center">

            <small className="font-bold text-left mr-5">Payment Options</small>
            <input type="submit" value="make Payment" className="px-2 border bg-slate-300 hover:bg-discover text-white" />
        </div>
}

      </form>

      <div className="flex flex-col  shadow-lg shadow-stone-500 p-5">
        <div className="p-3 flex  border-b">
          <button className="p-3 border border-black">
            {" "}
            <Link to="/cart">Back To Cart</Link>
          </button>
        </div>
        <div className="text-2xl font-serif w-full text-left p-3 ">
            
          OrderSummary
        </div>
        <div className="flex flex-col gap-5">{body}</div>
        <div className="flex flex-col w-full items-start p-3 font-mono font-semibold text-lg">
          <p>items: {detail.total_number_of_products}</p>
          <p>total: {detail.total_amount_of_all_goods_bought}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
