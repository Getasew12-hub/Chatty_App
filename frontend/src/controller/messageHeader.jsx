import React from 'react'
import "./messageHader.css"
import chatStore from '../store/chatStore';
import userStore from '../store/userAuthStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useEffect } from 'react';
import {UserSkeleton} from "../libe/skeletn"

function messageHeader() {
     const {selectUser,BackArrow,typing,removeinping,getTipingNoti,Cleartyping,isMesssageLoad}=chatStore();
     const {onlineUser}=userStore()
     const [windowSize,setSize]=useState(innerWidth)
       useEffect(()=>{
         const resize=()=>{
         
           setSize(innerWidth)
         }
     
       window.addEventListener('resize',resize);
     
       return ()=> removeEventListener('resize',resize);
       },[])

       useEffect(()=>{
        getTipingNoti()

       
    
     return ()=> removeinping;
       },[getTipingNoti,selectUser])
    if(typing){
 setTimeout(Cleartyping,4000)
    }

 
  return (
    <div className='header-container'>
      {isMesssageLoad? <UserSkeleton/>:
         <div className="header">
        {windowSize<=500 &&  <ArrowBackIcon style={{marginRight:'20px',cursor:'pointer'}} onClick={BackArrow}/>}
            <div className="image">
               {selectUser?.profilepic? <img src={selectUser?.profilepic} alt="" />:
               <p className='username'>{selectUser.fullname.charAt(0).toUpperCase()}</p>}
                 
            </div>
            <div className="discription">
                <p className='name'>{selectUser.fullname}</p>
               {onlineUser.includes(selectUser.id.toString()) ? <p style={{color:'dodgerblue'}}> {typing ? 'typing..' : "online"} </p>:
                <p style={{color:'gray'}}>offline</p>}
            </div>
        </div>}
    </div>
  )
}

export default messageHeader
