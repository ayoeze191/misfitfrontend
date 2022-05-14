import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartComponents from "./CartComponents/CartComponents";
const Cart = (props) => {
  const products = useSelector((state) => state.OrderReducer.orders);
  const total = useSelector((state) => state.OrderReducer);
  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );
  let body = null;
  body = products.map((product, index) => {
    return (
      <CartComponents
        key={index}
        id={product.product.id}
        name={product.product.name}
        category={product.product.category.title}
        quantity={product.quantity}
        stock_price={product.product.stock_price}
        image={product.product.productimage[0]}
        authenticated={whether_authenticated}
      />
    );
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 mt-2">
      <div className="shadow-md shadow-stone-500 p-3 px-8 md:px-3">
        <div className=" pl-0 pb-7 pt-0 flex border-b items-start justify-start">
          <button className="bg-white text-black shadow-md shadow-stone-500 p-3">
            <Link to="/products">Continue Shopping</Link>
          </button>
        </div>
        <div className="flex justify-between p-3 flex-col sm:flex-row items-center">
          <div className="flex justify-between flex-0.5 items-center w-full md:w-fit">
            <p>
              items:<span>{total.total_number_of_products}</span>
            </p>
            <p>
              Total:<span>{total.total_amount_of_all_goods_bought}</span>
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Link to="/checkout" className="mt-3">
              <button className="bg-discover text-white p-3">CheckOut</button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" shadow-md shadow-stone-500 p-3 flex flex-col items-end">
        {/* <div className="flex w-3/4 justify-between pr-6">
          <span>category</span>
          <span>name</span>
          <span>size</span>
          <span>Amount</span>
          <span>Quantity</span>
        </div> */}
        <table className="w-full">
          <tr className="hidden md:table-row">
            <th></th>
            <th className="p-3 text-left">category</th>
            <th className="">name</th> <th className="">size</th>{" "}
            <th className="">Amount</th> <th className="">Quantity</th>
          </tr>
          <tbody className="text-center">
            {body}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
