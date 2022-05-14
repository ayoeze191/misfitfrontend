import React, { useEffect } from "react";
import Padlock from "./../assets/materials/Padlock.svg";
import Vector from "./../assets/materials/Vector.jpg";
import s from "./../assets/materials/s.png";
import iconMenu from "./../assets/materials/iconMenu.svg";
import searchBottom from "./../assets/materials/searchBottom.svg";
import { get_orders } from "../Store/Actions/OrderAction";
import { Link, Navigate, useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {

  
  const cartNumber = useSelector(
    (state) => state.OrderReducer.total_number_of_products
  );
  const whether_authenticated = useSelector(
    (state) => state.AuthReducer.authenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(get_orders());
  }, [whether_authenticated]);

  return (
    <div className=" px-7 flex justify-between  border border-border_color border-x-0 h-16 items-center">
     <Link to='/'> <div className="font-lato text-3xl text-left text flex items-center sm:text-4xl md:text-5xl">
        Misfit
      </div>
      </Link>
      <ul className="hidden  md:flex gap-10 justify-between items-center font-lato_light font-normal">
        <li className="">Descover Bespoke</li>
        <li className="">Men</li>
        <li className="">Women</li>
        <li className="">Kids</li>
        <li className="">Collection</li>
      </ul>
      <div className="flex   justify-between items-center gap-7 ">
        <div className="relative w-full hidden sm:block">
          <input
            placeholder="Search Product"
            type="text"
            className="font-lato_italic font-extralight border border-border_color border-x-0 border-t-0 md:w-56"
          />
          <img
            src={s}
            width="30"
            height="30"
            className="absolute right-0 top-0 min-h-fit"
          />
          {/* <img src={searchBottom} /> */}
        </div>
        
        <div
          className="hidden md:block md:relative w-10 h-10 "
          onClick={() => props.changeModalmode()}
        >
          {" "}
          <Link to='/cart'>
          <div className="absolute bg-red-700 w-6 h-fit rounded-3xl right-0 top-0 text-white">
            {cartNumber > 0 ? cartNumber : 0}
          </div>
          </Link>
          <div className="flex items-center h-full cursor-pointer"> <Link to="/cart"><img src={Padlock} width="35" height="35" /></Link></div>
        </div>
        <div className="">
        {!whether_authenticated && <button className="p-2 sm:p-3 border border-discover hover:bg-discover hover:text-yellow-50 text-xs sm:text-sm md:text-base "><Link to={"/auth"}>Signup/Login</Link></button>}
        {whether_authenticated && <button className="p-3 border border-discover hover:bg-discover hover:text-yellow-50"><Link to={"/Logout"}>LOGOUT</Link></button>}
        </div>
        <div
          onClick={() => props.ChangeSideBarMode()}
          className="relative md:hidden  h-full w-6 sm:w-10 flex items-center"
        >
          <div className="absolute bottom-3 left-3 md:text-lg bg-red-500 rounded-full  px-2 text-sm text-white font-bold">{cartNumber>0?cartNumber:0}</div>
          <img src={iconMenu} className="w-full " />
        </div>
      </div>
    </div>
  );
};
export default Header;
