import {React, Component} from "react";
import { connect } from "react-redux";
import { auth } from "../Store/Actions/AUTHAction";
import { Navigate } from "react-router-dom";
import Spinner from "./../UI/Spinner/Spinner.js"

class Auth extends Component{
    state = {
        "email": {
            'value': '',
            'validity': {
                '@': false,
                'valid': false
            }},
        "password": {
            'value' : '',
            'validity' : {
                "length": 7,
                'valid': false
            }
        },
        "password1": {
            'value' : '',
            'validity' : {
                "length": 7,
                'valid': false
            }
        },
        "name":  {
            'value': '',
            'validity': {
                "length": 5,
                valid: false
            }
        },
        "last_name": {
            'value': '',
            'validity': {
                "length": 5,
                valid: false
            }
        },
        'islogin': true
    }





    inputCHangeHandler = (e, type) => {
       
        const newState = {...this.state}
        newState[type].value = e.target.value
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
          
            if(this.state.password.value == this.state.password1.value){
                
                const payload = {
                    "email": this.state.email.value,
                    "password": this.state.password.value,
                    "name": this.state.name.value,
                    "last_name": this.state.last_name.value,
                }
                this.props.Auth(payload, this.state.islogin)
            }
           
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
        <div className="h-10  w-full  mb-4"><input className="h-full w-full pl-4" type = "email" placeholder="email" onChange={(e) => this.inputCHangeHandler(e, 'email')}/></div>
        {!this.state.islogin &&<div className="h-10 w-full mb-4"><input  className="h-full w-full pl-4" type = "text" placeholder="name" onChange={(e) => this.inputCHangeHandler(e, 'name')} /></div>}
        {!this.state.islogin && <div className="h-10 w-full mb-4"><input  className="h-full w-full pl-4" type = "text" placeholder="Lastname" onChange={(e) => this.inputCHangeHandler(e, 'last_name')}/></div> }
        <div className="h-10 w-full mb-4"><input  className="h-full w-full pl-4" type="password" placeholder="password" onChange={(e) => this.inputCHangeHandler(e, 'password')}/></div>
        {!this.state.islogin && <div className="h-10 w-full mb-4"><input  className="h-full w-full pl-4" type="password" placeholder="password 1" onChange={(e) => this.inputCHangeHandler(e, 'password1')}/></div> }
        {/* <div><input type = "submit" value="login/></div> */}
        <button className="h-10 bg-discover w-4/5" onClick={(e) => this.onSubmitHandler(e)}>Login</button>

        <h3 className="h-10 mb-4">don't have an account yet? <button className="text-discover h-10"  onClick={this.changemode}>switch to {this.state.islogin?'Register':'login'}</button></h3>
    </form>;
        if(this.props.isAuthenticated){
            authredirect = <Navigate to="/products"/>
        }
        if(this.props.isLoading){
            authredirect = <Spinner />
        }
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
        isLoading: state.AuthReducer.loading
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth)