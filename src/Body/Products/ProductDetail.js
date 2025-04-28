import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import like from "./../../assets/materials/like.png";
import { get_product_details } from "../../Store/Actions/ProductAction";
import {
  add_to_cart,
  visitor_add_to_cart,
} from "../../Store/Actions/OrderAction";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

import left from "./../../assets/materials/left.svg";
import right from "./../../assets/materials/left.svg";
import upperback from "./../../assets/materials/upperback.svg";
import { instance } from "../../utilities";
const ProductDetail = () => {
  const navigate = useNavigate();
  // setting dispatch hooks
  const dispatch = useDispatch();
  const [product_detail, setProductDetail] = useState(false);
  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );
  const { Product_id } = useParams();
  const [present_image, setPresent_image] = useState(0);
  const [loading, setLoading] = useState(true);
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

  const nextImage = () => {
    if (present_image != product_detail.images.length - 1) {
      setPresent_image((prev) => prev + 1);
    } else {
      setPresent_image(0);
    }
  };
  const previousImage = () => {
    if (present_image != 0) {
      setPresent_image((prev) => prev - 1);
    } else {
      setPresent_image(product_detail.images.length - 1);
    }
  };
  const goBack = () => {
    navigate(-1);
    // console.log("done");
  };

  const getProductDetail = async () => {
    // setLoading(true);
    const res = await instance.get("/products/" + Product_id);
    setProductDetail(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetail();
    // dispatch(get_product_details(Product_id));
  }, []);

  const addTocart = (id, price, name, image, category) => {
    const d_image = image;
    if (whether_authenticated) {
      dispatch(add_to_cart(id));
    } else {
      dispatch(visitor_add_to_cart(id, price, name, d_image, category));
    }
  };

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  ) : (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row gap-12 p-8 container mx-auto">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div className="relative w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <img
              className="w-full h-full object-contain rounded-lg"
              src={product_detail.images[present_image]}
              alt="Product"
            />
            <div className="absolute flex justify-between w-full px-4">
              <button
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition left"
                onClick={previousImage}
              >
                <MdArrowBackIosNew />
                {/* <i className="ri-arrow-left-s-line text-xl"></i> */}
              </button>
              <button
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition right"
                onClick={nextImage}
              >
                {/* <i className="ri-arrow-right-s-line text-xl"></i> */}
                <MdArrowForwardIos />
              </button>
            </div>
            <button
              className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              onClick={goBack}
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
          </div>
          <div className="flex gap-4 justify-center">
            {product_detail.images.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 bg-gray-100 rounded-lg shadow-md cursor-pointer ${
                  present_image === index ? "ring-2 ring-discover" : ""
                }`}
                onClick={() => setPresent_image(index)}
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-800">
              {product_detail.title}
            </h1>
            <button className="w-12 h-12 bg-gray-100 rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition">
              <img className="w-6" src={like} alt="Like" />
            </button>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-lg font-medium text-gray-600">SKU</span>
            <span className="text-lg font-semibold text-gray-800">
              {product_detail.sku}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              ${product_detail.price.toFixed(2)}
            </h3>
            <button
              onClick={() =>
                addTocart(
                  product_detail.id,
                  product_detail.price,
                  product_detail.title,
                  product_detail.images[0],
                  product_detail.category
                )
              }
              className="w-full py-4 bg-green-300 text-white font-semibold rounded-lg shadow-md hover:bg-discover-dark transition"
            >
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Description
            </h2>
            <p className="text-gray-600">{product_detail.description}</p>
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Additional Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Brand: {product_detail.brand}</li>
              <li>Weight: {product_detail.weight}g</li>
              <li>
                Dimensions:{" "}
                {`${product_detail.dimensions.width} x ${product_detail.dimensions.height} x ${product_detail.dimensions.depth}`}{" "}
                cm
              </li>
              <li>Warranty: {product_detail.warrantyInformation}</li>
              <li>Shipping: {product_detail.shippingInformation}</li>
              <li>Availability: {product_detail.availabilityStatus}</li>
            </ul>
            <button className="mt-4 text-discover font-medium hover:underline">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
