import React, { useEffect } from 'react'
import "./Navbar.CSS"
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import userStore from '../store/userAuthStore';
import themStore from "../store/themStore";


function Navbar() {

  const {user,logout,smallLoad}=userStore();
  const {setThem,them}=themStore()

  useEffect(()=>{
const color=document.querySelector('.main')

if(them=='dark'){
  
  color.classList.remove('light')
color.classList.add('dark');

}else{
 color.classList.add('light');


}
},[them])

  return (
    <div className='navbar-container'>

      <div className="item-contain">
      <div className="leftbar">
       <Link to={"/"}> <div> 
        <p className='icon'><ChatBubbleOutlineOutlinedIcon/></p>
        <p className='header'>Chatty</p>
        </div></Link>
       
      </div>

      <div className="rightbar">
     
       {user && <Link to={"/profile"}> <div><PersonOutlineOutlinedIcon/> <span>Profile</span> </div></Link>  }
       {user && <div onClick={logout}><LogoutOutlinedIcon/><span> {smallLoad? "Loadding...": "Logout"}</span></div>}
          {them=='dark' ?<div onClick={()=> setThem('light')}><LightModeOutlinedIcon/></div>:
          <div  onClick={()=> setThem('dark')}><ModeNightOutlinedIcon/> </div>}
      </div>
      </div>
    </div>
  )
}

export default Navbar
