import React, { useEffect } from "react";
import Filter from "./../../assets/materials/Filter.svg";
import Product from "./Product";
import { connect } from "react-redux";
import { get_all_products } from "../../Store/Actions/ProductAction";

const Products = (props) => {
  useEffect(() => {
    props.get_all_products();
  }, []);

  
  return (
    <div className="px-7 flex flex-col gap-14 ">
      <div className="flex justify-between items-center h-16  border border-border_color border-x-0">
        <div className="w-1/5 justify-start  text-left">
          Ready-To-Wear
          <span className="font-light h-full my-auto">(3000+ products)</span>
        </div>
        <div className="flex w-20 justify-evenly">
          Filter <img width="20" height="20" className="" src={Filter} />
        </div>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
        {props.all_products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
