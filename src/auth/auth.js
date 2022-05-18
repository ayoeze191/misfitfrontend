import {React, Component} from "react";
import { connect } from "react-redux";
import { auth } from "../Store/Actions/AUTHAction";
import { Navigate } from "react-router-dom";
import Spinner from "./../UI/Spinner/Spinner.js"
import { checkValidity } from "./rules";

class Auth extends Component{
    state = {
        email: {
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
    },
        password: {
            value : '',
            validation : {
                minLength: 6
            },
            valid: false,
            touched: false
        },
        password1: {
            value : '',
            validation : {
                length: 7,
            },
            valid: false,
            touched: false
        },
        name:  {
            value: '',
            validation: {
                length: 5,
            },
            valid: false,
            touched: false
        },
        last_name: {
            value: '',
            validation: {
                length: 5,
            },
            valid: false,
            touched: false
        },
        islogin: true
    }

    

    


    inputCHangeHandler = (e, type) => {
       
        const newState = {...this.state};
        newState[type].value = e.target.value;
        if(type.length > 0){
            newState[type].touched = true
        }
        else{
            newState[type].touched = false
        }
        let valid = checkValidity( e.target.value, this.state[type].validation)
        console.log(this.state[type].validation)
        newState[type].valid = valid
        console.log(valid)
        this.setState({
            ...newState
        })
    }


    onSubmitHandler = (e) => {
        e.preventDefault()
        if(this.state.islogin){
            const payload = {
                "email": this.state.email.value,
                "password" : this.state.password.value
            }
            this.props.Auth(payload, this.state.islogin)
        }
        else{
                
                const payload = {
                    "email": this.state.email.value,
                    "password": this.state.password.value,
                    "password1": this.state.password1.value,
                    "name": this.state.name.value,
                    "last_name": this.state.last_name.value,
                }
                this.props.Auth(payload, this.state.islogin)
            
        }
    }


    componentDidUpdate() {
          
    }

    changemode = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {islogin: !prevState.islogin}
        })
    }

    

    render()
    {
        let authredirect = <form className="my-10 mx-auto w-4/5 text-center shadow-lg shadow-black border-1 border-black p-3 box-content mdd:w-fit mdd:p-10 bg-light_white max-w-lg">
        
       <h2 className="h-10 w-full ">Login</h2> 
        <div className="h-10  w-full  mb-4 "><input className={`h-full w-full pl-4 ${!this.state.email.valid && this.state.email.touched ?' outline-red-400':null}`} type = "email" placeholder="email" onChange={(e) => this.inputCHangeHandler(e, 'email')}/></div>
        {!this.state.islogin &&<div className="h-10 w-full mb-4"><input  className={`h-full w-full pl-4 ${!this.state.name.valid && this.state.name.touched ?'outline-red-400':null}`} type = "text" placeholder="name" onChange={(e) => this.inputCHangeHandler(e, 'name')} /></div>}
        {!this.state.islogin && <div className="h-10 w-full mb-4"><input  className={`h-full w-full pl-4 ${!this.state.last_name.valid && this.state.last_name.touched ?'outline-red-400':null}`} type = "text" placeholder="Lastname" onChange={(e) => this.inputCHangeHandler(e, 'last_name')}/></div> }
        <div className="h-10 w-full mb-4"><input  className={`h-full w-full pl-4 ${!this.state.password.valid && this.state.password.touched ?'bg-red-400':null}`} type="outline-red-400" placeholder="password" onChange={(e) => this.inputCHangeHandler(e, 'password')}/></div>
        {!this.state.islogin && <div className="h-10 w-full mb-4"><input  className={`h-full w-full pl-4 ${!this.state.password1.valid && this.state.password1.touched ?'outline-red-400':null}`} type="password" placeholder="password1" onChange={(e) => this.inputCHangeHandler(e, 'password1')}/></div> }
        {/* <div><input type = "submit" value="login/></div> */}
        <button className="h-10 bg-discover w-4/5 text-white font-poppins_semiBold" onClick={(e) => this.onSubmitHandler(e)}>Login</button>
            <div className="mt-4 text-red-800 font-lato_light">{this.props.authMessage}</div>
        <h3 className="h-10 mb-4">don't have an account yet? <button className="text-discover h-10"  onClick={this.changemode}>switch to {this.state.islogin?'Register':'login'}</button></h3>
    </form>;
        if(this.props.isAuthenticated){
            authredirect = <Navigate to="/products"/>
        }
        if(this.props.isLoading){
            authredirect = <Spinner />
        }
        // console.log(this.state.email.valid)
        return(  
            authredirect
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        Auth: (payload, islogin) => dispatch(auth(payload, islogin))
    }
}


const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.AuthReducer.authenticated,
        isLoading: state.AuthReducer.loading,
        authMessage: state.MessageReducer.authmessage
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth)