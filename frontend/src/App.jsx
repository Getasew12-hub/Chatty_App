import React from 'react'
import "./index.css"
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/homePage'
import Signup from "./pages/auth/signup"
import Login from "./pages/auth/login"
import ProfilePage from './pages/profilePage'

import Navbar from './controller/Navbar'
import userStore from "./store/userAuthStore"
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"




function App() {

  const {Checkauth,checkAuth,user,onlineUser}=userStore()
  
useEffect(()=>{
  Checkauth();
},[Checkauth])

  if(checkAuth) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontWeight:'bold'}}>Loading...</div>

  return (
    <div>
      <Navbar/>
    <Routes>
        <Route path='/' element={user ? <HomePage/> :<Navigate to={"/login"}/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to={"/"}/>}/>
        <Route path='/login' element={!user ?<Login/> : <Navigate to={"/"}/>}/>
       <Route path='/profile' element={user ?<ProfilePage/> : <Navigate to={"/login"}/>}/>
      
    
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
