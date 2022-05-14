import React from "react";

const OverLay = (props) => {
    return (
        <div className="absolute w-full bg-black opacity-60 z-30 h-full" onClick={props.clearscreen}></div>
    )
}


export default OverLay