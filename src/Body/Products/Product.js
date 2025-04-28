import React from "react";
import CartLock from "./../../assets/materials/CartLock.png";
import Person from "./../../assets/materials/Person.svg";
import like from "./../../assets/materials/like.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef, useEffect } from "react";
import {
  add_to_cart,
  visitor_add_to_cart,
} from "../../Store/Actions/OrderAction";
import Shimmer from "./Cart/Skeleton";

const Product = (props) => {
  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );
  const [showImage, setShowImage] = useState(false); //  image is in viewport
  const [loaded, setLoaded] = useState(false); //  image has fully loaded
  const imageRef = useRef(null); // for observer
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowImage(true), 100); // Set showImage to true when in view
          // setLoaded(true);
          observer.unobserve(entry.target); // Stop observing once the image is in view
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Cleanup
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  const ToProductDetail = () => {
    const tos = `/${props.id}`;
    navigate(tos);
  };

  const addTocart = (id, price, name, image, category) => {
    const d_image = `${image}`;
    if (whether_authenticated) {
      dispatch(add_to_cart(id));
    } else {
      dispatch(visitor_add_to_cart(id, price, name, d_image, category));
    }
  };
  const localBasedUrl =
    process.env.NODE_ENV === "developement node"
      ? "http://127.0.0.1:8000/"
      : "";

  return (
    <div
      className="shadow-lg shadow-stone-500 p-4 rounded-lg bg-white"
      ref={imageRef}
    >
      <div className="flex flex-col gap-4">
        {!loaded && <Shimmer />}
        {showImage && (
          <div className="hover:scale-95 transition-transform duration-300 h-[300px] w-[300px] overflow-hidden rounded-md">
            <img
              onLoad={() => setLoaded(true)}
              src={props.images[0]}
              alt={props.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <h5 className="text-lg text-left font-poppins_Regular font-semibold text-gray-800">
          {props.name}
        </h5>
      </div>
      <div className="flex border-t pt-4 mt-4 justify-between items-center">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border border-green-300 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition-colors duration-300"
            onClick={() =>
              addTocart(
                props.id,
                props.price,
                props.title,
                props.images[0],
                props.category
              )
            }
          >
            Add To Cart
          </button>
          <button
            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-500 hover:text-white transition-colors duration-300"
            onClick={ToProductDetail}
          >
            View
          </button>
        </div>
        <div className="text-lg font-semibold text-gray-800">
          ${props.stock_price}
        </div>
      </div>
    </div>
  );
};
export default Product;
