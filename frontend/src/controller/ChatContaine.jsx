import React from 'react'
import "./chatContaine.css"
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

function ChatContaine() {
  return (
    <div className='chat-containe'>
        <div className="chat">
            <p className='iconcontaine'><ChatBubbleOutlineOutlinedIcon style={{color:'aqua'}} className='icon'/></p>
            <h1>Welcome to Chatty</h1>
            <p className='select'>Select a conversation from the sidebar to start chatting</p>
        </div>
    </div>
  )
}

export default ChatContaine
