import React, { useEffect } from "react";
import Filter from "./../../assets/materials/Filter.svg";
import Product from "./Product";
import { connect, useSelector } from "react-redux";
import { get_all_products } from "../../Store/Actions/ProductAction";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "./../../axios";
import withErrorHandler from "../../withErrorHandler";
const Products = (props) => {
  const isLoading = useSelector((state) => state.ProductReducer.productLoading);
  const query = useSelector((state) => state.ProductReducer.query);
  useEffect(() => {
    get_all_products();
  }, []);
  console.log(isLoading, "isLoading");
  let body = null;
  if (isLoading) {
    body = <Spinner />;
  } else {
    body = (
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
        {props.all_products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-14 ">
      <div className="border-b border-border_color w-full">
        <div className="flex container mx-auto justify-between items-center   text-xs py-2 sm:text-sm md:text-base">
          <div className="text-left font-semibold">
            Ready-To-Wear
            <span className="font-light ml-2 text-gray-500">
              (3000+ products)
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
            <span>Filter</span>
            <img
              width="20"
              height="20"
              className="hover:scale-110 transition-transform duration-200"
              src={Filter}
              alt="Filter Icon"
            />
          </div>
        </div>
      </div>
      {body}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_all_products: () => dispatch(get_all_products()),
  };
};

const mapStateToProps = (state) => {
  return {
    all_products: state.ProductReducer.allProducts,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Products, axios));
