import React, { useState } from 'react'
import "./homePage.css"

import chatStore from "../store/chatStore"
import SideBar from '../controller/SideBar';
import ChatContaine from '../controller/ChatContaine';
import Messages from '../controller/Messages';
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect } from 'react';



function homePage() {
  const {selectUser,BackArrow}=chatStore();
  const [windowSize,setSize]=useState(innerWidth)

  useEffect(()=>{
    const resize=()=>{
      
      setSize(window.innerWidth)
    }

  window.addEventListener('resize',resize);

  return ()=> removeEventListener('resize',resize);
  },[])
useEffect(()=>{
  setSize(innerWidth)
},[windowSize])
  useEffect(()=>{
    window.addEventListener('popstate',(event)=>{
     
      if(event.state.page=='user'){
        BackArrow()
      }
    })
  },[])


  return (
    <div className='home-container'>
         <div className="leftside">
          

      {selectUser && windowSize<=500 ? '' :<SideBar/>}
         </div>
         
    {selectUser ?  windowSize>500 && <Messages/> :  windowSize>500 && <ChatContaine/>}

       {selectUser && windowSize<=500 && <Messages/>}
  {selectUser && windowSize>=1350 && <div className="chatplaceholder">
      <div className="rotatanimi">
        <ChatIcon className='icon'/>
      
        </div>
        <h1>Start chat now</h1>
        
        </div>}
    </div>
  )
}

export default homePage
