import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Messages = () => {
    const message = useSelector((state) => state.MessageReducer.cartMessage)
    // const notify = () => toast("Wow so easy!");

    return(
        <div className="bg-green-200 h-fit w-full ">
            {message}
            <ToastContainer />
        </div>
    )
}

export default Messages