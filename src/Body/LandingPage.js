import React from "react";
import { Link } from "react-router-dom";
import malik from './../assets/materials/malik.svg'


const LandingPage = () => {
    return (
        <div className="mb-12 flex flex-col gap-5 mt-5">
            <div className = "h-3/4">
            <img src={malik} className="w-full h-full" />
            </div>
            
            <div  className="flex flex-col gap-4">
            <h1 className="bg-red text-5xl font-lato font-bold">2021 Misfit bold collection</h1>
            <h6 className=" text-2xl font-lato font-normal">Explore connections. Discover Fashion beyound imaginative borders</h6>
            <Link to="/products" className="bg-discover w-96 mx-auto h-16 flex items-center justify-center text-3xl font-lato font-bold text-white" >Discover</Link>
            </div>
        </div>
    )
}
export default LandingPage