import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import like from "./../../assets/materials/like.png";
import { get_product_details } from "../../Store/Actions/ProductAction";
import { add_to_cart, visitor_add_to_cart } from "../../Store/Actions/OrderAction";
import left from "./../../assets/materials/left.svg";
import right from "./../../assets/materials/left.svg";
import upperback from "./../../assets/materials/upperback.svg";
const ProductDetail = () => {
  const navigate = useNavigate();
  // setting dispatch hooks
  const dispatch = useDispatch();
  const product_detail = useSelector(
    (state) => state.ProductReducer.productDetails
  );
  const whether_authenticated = useSelector((state) => state.AuthReducer.authenticated)
  const { Product_id } = useParams();
  const [present_image, setPresent_image] = useState(0);
  // console.log(product_detail);
  const ChangePresentImage = (e) => {
    if (e.target.classList.contains("left")) {
      if (present_image != 0) {
        setPresent_image((prev) => prev - 1);
      } else {
        setPresent_image(product_detail.productimage.length - 1);
      }
    } else {
      if (present_image != product_detail.productimage.length - 1) {
        setPresent_image((prev) => prev + 1);
      } else {
        setPresent_image(0);
      }
    }
  };
  const goBack = () => {
    navigate(-1);
    // console.log("done");
  };

  useEffect(() => {
    dispatch(get_product_details(Product_id));
  }, []);

  const addTocart = (id, price, name, image, category) => {
    const d_image = image
    if(whether_authenticated){
      dispatch(add_to_cart(id))
    }
    else{
      dispatch(visitor_add_to_cart(id, price, name, d_image, category))
    }
  };


  return (
    <div className="md:flex">
      <div className="flex flex-col gap-8 w-100 ">
        <div className="w-4/5 mx-auto h-full pt-4 flex relative items-center justify-center bg-gray-100 md:w-full">
          <img
            className="w-full"
            src={product_detail.productimage[present_image]}
          />
          <div className="absolute flex justify-between w-full max-w-lg  mx-auto">
            <div
              className="w-12 h-12 bg-light_white cursor-pointer flex left "
              onClick={ChangePresentImage}
            >
              <img className="m-auto" src={left} />
            </div>
            <div
              className="w-12 h-12 bg-light_white cursor-pointer flex right"
              onClick={ChangePresentImage}
            >
              <img className="m-auto" src={right} />
            </div>
          </div>
          <div
            className="absolute left-0 top-4 bg-light_white flex items-center justify-between w-12 h-12"
            onClick={goBack}
          >
            <img src={upperback} className="m-auto" />
          </div>
        </div>
        <div className="flex w-full gap-8  mx-auto justify-center">
          {product_detail.productimage.map((image) => (
            <div className="w-1/6 bg-gray-100">
              <img
                className="w-full h-full"
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 mx-auto pl-4">
        <div className=" flex p-4 pb-20">
          <h1 className="text-left text-5xl font-lato font-semibold w-96">
            {product_detail.name.toUpperCase()}
          </h1>
          <div className="flex justify-end w-5/6">
            <img className="w-12 h-12" src={like} />
          </div>
        </div>
        <div className="flex justify-between p-4  border border-border_color border-x-0 mb-16">
          size <span>36</span>
        </div>
        <div className="flex flex-col mb-36">
          <h3 className="w-full text-left">${product_detail.stock_price}</h3>
          <button
            onClick={() => addTocart(product_detail.id,
               product_detail.stock_price, product_detail.name,
                product_detail.productimage[0], 
                product_detail.category.title)}
            className="bg-discover py-4"
          >
            Add to Cart
          </button>
        </div>
        <div>
          <h2>Detailed Features</h2>
          <ul>
            <li>Main Material: 100% silk</li>
            <li>Other Material: 79% Wool 20% Polyamide</li>
            <li>Lining: 53% Viscose, 47% Cupro</li>
          </ul>
          <h6>Read More</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
