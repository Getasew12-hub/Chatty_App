import React, { useEffect, useState } from 'react'
import "./Messages.css";
import chatStore from '../store/chatStore';
import Header from "./messageHeader"
import AddChat from './addChat';
import AllMessages from './AllMessages';
function Messages() {
    const {selectUser,message,isMesssageLoad}=chatStore();





  return (
    <div className='message-container'>
        <div className="item-constainer">
            <Header />
            <AllMessages/>
            <AddChat/>
        </div>
    </div>
  )
}

export default Messages
