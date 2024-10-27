import React from "react";
import Padlock from './../assets/materials/Padlock.svg'
import Vector from './../assets/materials/Vector.jpg'
import s from './../assets/materials/s.png'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md"
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";


const SideBar = ({showSideBar, handleRemoveSidebar}) => {
  const dispatch = useDispatch();
    const cartNumber = useSelector(
        (state) => state.OrderReducer.total_number_of_products
      )
    
    return(

        <div className=" sm:hidden h-full w-full bg-white flex flex-col p-5 gap-7  fixed z-50"
        style={{
          transform: !showSideBar?"translateX(-20000px)":"translateX(0px)",
          transition: "all 1s"
        }}
        >
          <div className="w-full flex justify-end">
            {/* <IoCloseSharp/> */}
            <IoMdCloseCircleOutline fontSize={25} className="cursor-pointer" onClick={handleRemoveSidebar}/>
            </div>
            <div className="flex items-center justify-between gap-4">
            <div className="flex relative">
               <Link to='/cart'> <div className="absolute bg-red-600 rounded-full text-xs px-1 bottom-4 right-2 text-white font-bold">{cartNumber} </div></Link>
                <div className="">
                <MdOutlineShoppingCart fontSize={20}/>
                  </div>
            </div>
            <div className="relative flex-1  md:hidden">
          <input
            placeholder="Search Product"
            type="text"
            className="font-lato_italic font-extralight border border-border_color border-x-0 border-t-0  w-full"
          />
           <IoSearch fontSize={20} className="absolute right-0 top-0 min-h-fit"/>
          {/* <img src={searchBottom} /> */}
        </div>
        </div>
        
                <ul className="flex flex-col gap-8 ">
                    <li className="text-left cursor-pointer hover:underline">Descover Bespoke</li>
                    <li className="text-left cursor-pointer hover:underline" onClick={() =>{ 
                      
                      dispatch({type: "QUERYING", payload: "Men"})
                      handleRemoveSidebar()
                      
                      }}>Men</li>
                    <li className="text-left cursor-pointer hover:underline">Women</li>
                    <li className="text-left cursor-pointer hover:underline">Kids</li>
                    <li className="text-left cursor-pointer hover:underline">Collection</li>
                </ul>     
        </div>
      
    )
}

export default SideBar