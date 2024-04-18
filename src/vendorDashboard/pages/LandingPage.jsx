import  { useState,useEffect } from 'react'
import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar'
import Login from "../components/forms/Login"
import Register from "../components/forms/Register"
import AddFirm from "../components/forms/AddFirm"
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts'

const LandingPage = () => {


  const [showLogin,setShowLogin]=useState(false);
  const [showRegister,setShowRegister]=useState(false);
  const [showFirm,setShowFirm]=useState(false);
  const [showProduct,setShowProduct]=useState(false);
  const [showWelcome,setShowWelcome]=useState(false);
  const [showAllProducts,setShowAllProducts]=useState(false);
  const[showLogout,setShowLogout]=useState(false);
  const[showFirmTitle,setShowFirmTitle]=useState(true);
  useEffect(()=>{
const loginToken=localStorage.getItem('loginToken')
if(loginToken){
  setShowLogout(true)
}
  },[])

  useEffect(()=>{
    const firmname=localStorage.getItem('firmname')
    if(firmname){
      setShowFirmTitle(false)
    }
  },[])
  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  };
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showFirmHandler=()=>{
    if(showLogout){
   
      setShowFirm(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert("please login")
      setShowLogin(true);
      setShowRegister(false)
    }
 
  }
  const showProductHandler=()=>{
    if(showLogout){
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(true)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert("please login")
    setShowLogin(true);
    setShowRegister(false)
  }
  }
  const showWelcomeHandler=()=>{
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(true)
    setShowAllProducts(false)
  }
  const showAllProductsHandler=()=>{
    if(showLogout){
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
  }else{
    alert("please login")
    setShowLogin(true);
    setShowRegister(false)
  }

  }
const logoutHandler=()=>{
  confirm("Are you sure to logout")
  localStorage.removeItem("loginToken")
  localStorage.removeItem("firmId")
  localStorage.removeItem('firmname');
  setShowLogout(false)
  setShowFirmTitle(true)
}

  return (
   <>
   <section className='landingSection'>
    <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout}  logoutHandler={logoutHandler}/>
    <div className="collectionSection">
    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
    {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/> }
    {showRegister && <Register showLoginHandler={showLoginHandler}/>}
    {showFirm &&  showLogout&&<AddFirm/>  }
    {showProduct&& showLogout && <AddProduct/>}
    {showWelcome && <Welcome/>}
  {showAllProducts && showLogout && <AllProducts/>}
    </div>
   
   </section>
   </>
  )
}

export default LandingPage
