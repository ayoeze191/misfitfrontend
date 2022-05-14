import React from "react";
import Padlock from './../assets/materials/Padlock.svg'
import Vector from './../assets/materials/Vector.jpg'
import s from './../assets/materials/s.png'
import { useSelector } from "react-redux";

const SideBar = () => {
    const cartNumber = useSelector(
        (state) => state.OrderReducer.total_number_of_products
      )
    return(

        <div className=" h-full w-4/6 bg-white flex flex-col p-5 gap-7 rounded-r-xl rounded-br-3xl fixed z-50">
            <div className="flex items-center justify-between gap-4">
            <div className="flex ">
                <div className="absolute bg-red-600 rounded-full w-5">{cartNumber} </div>
                <div className=""><img src={Padlock} /></div>
            </div>
            <div className="relative flex-1  md:hidden">
          <input
            placeholder="Search Product"
            type="text"
            className="font-lato_italic font-extralight border border-border_color border-x-0 border-t-0  w-full"
          />
          <img
            src={s}
            width="30"
            height="30"
            className="absolute right-0 top-0 min-h-fit"
          />
          {/* <img src={searchBottom} /> */}
        </div>
        </div>
        
                <ul className="flex flex-col gap-8 ">
                    <li className="text-left">Descover Bespoke</li>
                    <li className="text-left">Men</li>
                    <li className="text-left">Women</li>
                    <li className="text-left">Kids</li>
                    <li className="text-left">Collection</li>
                </ul>     
        </div>
      
    )
}

export default SideBar