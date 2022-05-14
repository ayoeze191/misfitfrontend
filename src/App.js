import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import LandingPage from './Body/LandingPage';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Body/Products/Products';
import ProductDetail from './Body/Products/ProductDetail';
import Auth from './auth/auth';
import SideBar from './UI/SideBar';
import OverLay from './UI/Overlay';
import { useEffect, useState } from 'react';
import Store from './Store/Store';
import { getCookie, get_orders } from './Store/Actions/OrderAction';
import Cart from './Body/Products/Cart/Cart';
import { load_user } from './Store/Actions/AUTHAction';
import { useDispatch } from 'react-redux';
import CheckOut from './Body/CheckOut/CheckOut';
import Logout from './auth/Logout/Logout';
import Messages from './UI/Messages';



function App() {
  useEffect(() => {
    Store.dispatch(load_user());
   
  }, [])

  const [showSideBar, setShowSideBar] = useState(false);
  const [showOverlay, setShowOverLay] = useState(false);
 
  

  



  const changeSideBarMode = (e) => {
    setShowOverLay(!showOverlay)
    setShowSideBar(!showSideBar)
  }
  
  

  const clearScreen = () => {
    setShowOverLay(false)
    setShowSideBar(false)
  }



  const classes = ['relative min-h-screen w-full']
  const overflow = 'overflow-hidden'

 

  return (
    <div className={classes.join(' ')}>
      {showSideBar && <SideBar /> }
      {showOverlay && <OverLay clearscreen = {clearScreen}/> }
      {/* {<Cart clearscreen = {clearScreen}/> } */}

      {/* <Cart /> */}
        
        
        <Router>
        <Header ChangeSideBarMode={changeSideBarMode} />
        <Messages />
      <Routes>
       
        <Route path = "/" element = {<LandingPage />} />
        
        <Route path = "/Products" element = {<Products/>} />
        <Route path='/Products/:Product_id' element = {<ProductDetail/>}/>
        <Route path = '/auth' element = {<Auth/>} />
        <Route path = '/cart' element = {<Cart />} />
        <Route path = '/checkout' element = {<CheckOut />} />
        <Route path = '/logout' element = {<Logout />} />

      </Routes>
        </Router>
    </div>
  );
}

export default App;
