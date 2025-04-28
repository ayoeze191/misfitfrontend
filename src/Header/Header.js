import React, { useEffect, useState } from "react";
import Padlock from "./../assets/materials/Padlock.svg";
import iconMenu from "./../assets/materials/iconMenu.svg";
import { get_orders } from "../Store/Actions/OrderAction";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { product_search_action } from "../Store/Actions/ProductAction";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import VariantsExample from "./VariantButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { get_product_based_category } from "../Store/Actions/ProductAction";
import { QUERYING } from "../Store/ActionTypes/ActionTypes";

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const cartNumber = useSelector(
    (state) => state.OrderReducer.total_number_of_products
  );
  const searchHandler = (searchValue) => {
    dispatch(product_search_action(searchValue));
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
    console.log();
  };

  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );

  useEffect(() => {
    dispatch(get_orders());
  }, [whether_authenticated]);

  useEffect(() => {
    searchHandler(searchValue);
  }, [searchValue]);

  return (
    <div className="border border-border_color border-x-0">
      <div className=" flex justify-between container mx-auto  h-16 items-center">
        <Link to="/">
          {" "}
          <div className=" font-lato text-2xl text-left text flex items-center sm:text-4xl md:text-3xl">
            Misfit
          </div>
        </Link>
        <ul className="hidden  md:flex justify-between gap-7 items-center font-lato_light font-normal text-sm ">
          <li className="cursor-pointer hover:underline">Descover Bespoke</li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() =>
              dispatch(get_product_based_category("kitchen-accessories"))
            }
          >
            Kitchen Accessories
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => dispatch(get_product_based_category("fragrances"))}
          >
            Fragrances
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() =>
              dispatch(get_product_based_category("home-decoration"))
            }
          >
            Home Decoration
          </li>
          {/* <li className="">Collection</li> */}
        </ul>
        <div className="relative  hidden sm:flex  ">
          <input
            placeholder="Search Product"
            type="text"
            className="font-lato_italic font-extralight border border-border_color border-x-0 border-t-0 "
            onChange={(e) => onChangeHandler(e)}
            value={searchValue}
          />
          <IoSearch
            onClick={searchHandler}
            fontSize={20}
            className="relative -left-7"
          />
        </div>
        <div className="flex   justify-between items-center gap-4  ">
          <div className="flex justify-between gap-4">
            <div
              className="hidden md:block md:relative "
              onClick={() => props.changeModalmode()}
            >
              {" "}
              <Link to="/cart">
                <div className="absolute left-3 -top-1 bg-red-700 flex justify-center items-center w-4 text-xs h-fit rounded-3xl right-0  text-white">
                  {cartNumber > 0 ? cartNumber : 0}
                </div>
              </Link>
              <div className="flex items-center w-7 h-full cursor-pointer">
                {" "}
                <Link to="/cart">
                  <MdOutlineShoppingCart fontSize={20} />
                </Link>
              </div>
            </div>
            {!whether_authenticated && (
              <button className="p-2  border border-discover hover:bg-discover hover:text-yellow-50 text-xs  w-full">
                <Link to={"/auth"}>Signup/Login</Link>
              </button>
            )}
            {whether_authenticated && (
              <button className="p-3 border border-discover hover:bg-discover hover:text-yellow-50">
                <Link to={"/Logout"}>LOGOUT</Link>
              </button>
            )}
          </div>
          {/* <VariantsExample /> */}
          <div
            onClick={() => props.ChangeSideBarMode()}
            className="relative md:hidden  h-full w-6 sm:w-10 flex items-center"
          >
            <div className="absolute bottom-3 left-3 md:text-sm bg-red-500 rounded-full  px-2 text-sm text-white font-bold">
              {cartNumber > 0 ? cartNumber : 0}
            </div>
            <GiHamburgerMenu fontSize={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
