import React from "react";

const CheckOutSummary = (props) => {
  let image = props.image
  if(props.authenticated){
    image = `http://127.0.0.1:8000${props.image}`
  }
  return (
    <div className="flex justify-between p-3 border-t items-center gap-4">
      <div className="rounded-2xl object-fill block h-24">
        <img src={image} className="h-full rounded-2xl mx-auto " />
      </div>
      <p data-label="name" className="">
        {" "}
        {props.name}
      </p>
      <p data-label="price " className="">{`$${props.stock_price}`}</p>
      <p className="">X{props.quantity}</p>
    </div>
  );
};

export default CheckOutSummary;
