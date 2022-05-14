import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LOGOUT } from "../../Store/ActionTypes/ActionTypes";
import Spinner from "../../UI/Spinner/Spinner";


const Logout = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.AuthReducer.authenticated)
    useEffect(() => {
        dispatch({'type': LOGOUT})
    })
    let body = <Spinner />
    
    return (
        <div>
            {!auth&&
        <Navigate to = "/auth"/>
        }
            {body}
        </div>
      
    )
}

export default Logout
