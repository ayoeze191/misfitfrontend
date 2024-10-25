import React from "react";
import { Link } from "react-router-dom";
import malik from './../assets/materials/malik.svg'


const LandingPage = () => {
    return (
        <div className="mb-12 flex flex-col gap-5 mt-5 w-full items-center">
            <div className = "h-3/4">
            <img src={malik} className="w-full h-full" />
            </div>
            
            <div  className="flex flex-col gap-4">
            <h1 className="bg-red lg:text-5xl font-lato font-bold text-center md:text-3xl text-2xl">2021 Misfit bold collection</h1>
            <h6 className=" text-lg text-center md:text-2xl font-lato font-normal mx-auto px-3">Explore connections. Discover Fashion beyound imaginative borders</h6>
            <Link to="/" className="bg-discover  py-3 px-10 mx-auto flex items-center justify-center sm:text-2xl md:text-3xl font-lato font-bold text-white text-sm" >Discover</Link>
            </div>
        </div>
    )
}
export default LandingPage