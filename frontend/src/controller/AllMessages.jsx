import React, { useEffect, useRef } from 'react'
import "./AllMessages.css"
import chatStore from '../store/chatStore'
import userStore from '../store/userAuthStore'
import {Skeletn,UserSkeleton,Loadding} from "../libe/skeletn"

function AllMessages() {
    const chatcontainer=useRef()
const {message,selectUser,onlinechat,isMesssageLoad,getPreviosMessage,ScrollWork,SmallLoad}=chatStore()
const {user}=userStore()


useEffect(()=>{
   if(ScrollWork){
  
    chatcontainer.current.scrollTop=chatcontainer.current.scrollHeight
   }
},[message])
function messageScroll(){
  console.log("scroll message is this",chatcontainer.current.scrollTop)
  console.log("second",chatcontainer.current.clientHeight)
  console.log("second",chatcontainer.current.scrollHeight)
  if((-chatcontainer.current.scrollTop + chatcontainer.current.clientHeight+10)>= chatcontainer.current.scrollHeight){
    console.log("now i am call")
    getPreviosMessage(selectUser)
  }
}

  return (
    <div className='converstation_messages' >
     
       {SmallLoad && <div className='samllloading' ><Loadding/></div>}


        <div className="messages" ref={chatcontainer} onScroll={messageScroll}>
     {!isMesssageLoad ?   message.map((val,index)=>   <div key={index} className={`each-message ${val.userid==user.id ? 'rightmessage' : 'leftmessage'} ` } >
              <div className="img">
             {val.userid==user.id ? user.profilepic ? 
              <img src={user.profilepic} alt="" /> :
                <p className='imagereplace'>{user.fullname.charAt(0).toUpperCase()}</p> :
                selectUser.profilepic? <img src={selectUser.profilepic} alt="" /> : <p className='imagereplace'>{selectUser.fullname.charAt(0).toUpperCase()}</p> 
                }  
             
             
             
            </div>
        
         <div className={`messages ${val.userid==user.id ? 'rightmessage' : 'leftmessage'} `}>
           <p className='date'>{val.create_at?.split('T')[1].split('.')[0]}</p>
           {val.img &&
           <div> <img className='imagchat' src={val.img} alt="" /></div>}
              {val.text}
         </div>
         </div>) :
         <>
         <Skeletn/>
         <Skeletn/>
         <Skeletn/>
         <Skeletn/>
         </>
        }</div>
    </div>
  )
}

export default AllMessages
