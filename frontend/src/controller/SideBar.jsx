import React, { useEffect } from 'react'
import "./SideBar.css"

import chatStore from '../store/chatStore'
import userStore from '../store/userAuthStore'
import { useState } from 'react'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useRef } from 'react'
import { UserSkeleton,Avater} from '../libe/skeletn'

function SideBar() {

   const heightScroll=useRef()
    const {getUsers,isUserlodding,getMessages,users,selectUser,Scrollmotion,scrollValue}=chatStore()
    const {user,onlineUser}=userStore()

    const [prieviesScroll,setScroll]=useState(null)
    const [onlineUseronly,setonlineuser]=useState(false)
    const [windowSize,setSize]=useState(innerWidth);

    
useEffect(()=>{
    getUsers()
},[getUsers])

useEffect(()=>{
  const resize=()=>{
    setSize(innerWidth)
  }

  window.addEventListener('resize',resize);
  return ()=> removeEventListener('resize',resize);
},[])

useEffect(()=>{

 if (heightScroll.current) {
            heightScroll.current.scrollTop = scrollValue;
           
        }
 
},[scrollValue, users])




function Getmessages(val){
  if(windowSize<=500){
    history.pushState({page:'user'},'user','/');
  }
getMessages(val)
}

const filterUser=onlineUseronly ? users.filter((val)=> onlineUser.includes(val.id.toString())): users

  return (
    <div className='sidebar-container'>
      <div className="contacts">
                  <div className='contact'><PeopleAltOutlinedIcon className='icon'/><p> Contacts</p></div>
             <div className="online">
                  <div className="checkbox" onClick={()=> setonlineuser(!onlineUseronly)}>
                   {onlineUseronly && <CheckIcon/>}
                  </div>

                  <label htmlFor="online">Online user only <span style={{color:"gray"}}>({onlineUser.length-1} online)</span></label>
             </div>

                </div>
             {!isUserlodding ?  <div className="users" ref={heightScroll} onScroll={(e) => Scrollmotion(e.target.scrollTop)}>
        {filterUser.map((val,index)=>   <div className="item-container" key={index} onClick={()=>Getmessages(val)} style={{background:selectUser?.id==val.id && 'var(--background)'}}>
        
            <div className="image">
              <div className="item">
              {val.profilepic?  <img src={val.profilepic} alt="" />:
              <p className='username'>{val.fullname.charAt(0).toUpperCase()}</p>}
           
              </div>
               {onlineUser.includes(val.id.toString()) &&  <p className='online'></p>}
            </div>
            <div className="discription">
                <p>{val.fullname.length>15 ? val.fullname.slice(0,15)+".." :val.fullname}</p>
               {onlineUser.includes(val.id.toString())? <p style={{color:'dodgerblue'}}>online</p>:
               <p style={{color:'gray'}}>offline</p>}
            </div>
           </div>)}
          </div> : windowSize > 1001 || windowSize<=500 ? <div>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
            <UserSkeleton/>
          </div> : <div>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            <Avater/>
            </div>}
         {onlineUseronly  && filterUser.length==0 && <div style={{padding:'10px'}}>No online users</div>}
    </div>
  )
}

export default SideBar
