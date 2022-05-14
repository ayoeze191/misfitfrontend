import React from "react";
import { useSelector } from "react-redux";

const Messages = () => {
    const message = useSelector((state) => state.MessageReducer.cartMessage)

    return(
        <div className="bg-green-200 h-fit w-full ">
            {message}
        </div>
    )
}

export default Messages