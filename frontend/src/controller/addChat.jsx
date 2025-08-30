import React, { useEffect, useRef, useState } from 'react'
import "./addChat.css"
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import chatStore from '../store/chatStore';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import userStore from '../store/userAuthStore';

function addChat() {
    const imageAccept=useRef()
    const clearImage=useRef()
    const imagePre=useRef()
    const {addMessages,selectUser,addmesLoad,onlinechat,removeOnlichat,typingNoti}=chatStore()
    const {user}=userStore()
    const [isdisable,setDisable]=useState(true)
    const [chat,setChat]=useState({
        text:"",
        img:null,
        userid:user.id,
    })

  useEffect(()=>{
  onlinechat()
  return ()=> removeOnlichat();
  },[addMessages,selectUser,onlinechat])  


useEffect(()=>{

  if(chat.text.length>0 || chat.img){
 
 setDisable(false)
  }else{
    
    setDisable(true)
  }
},[chat])

function handleImage(e){
    const file=e.target.files[0];

    if(file){
        const reader=new FileReader();

        reader.readAsDataURL(file);
        reader.onload=(e)=>{
            
            clearImage.current.removeAttribute('hidden')
            const image=e.target.result;
             setChat((pre)=>{
                return {...pre,img:image}})
            imagePre.current.src=image;
        }
    }

}
function textInput(e){
  typingNoti(selectUser.id)
    const {name,value}=e.target;

    setChat((pre)=>{
        return{
            ...pre,
            [name]:value.trimStart(),
        }
    })
}
function chatSubmit(e){
e.preventDefault();
 imagePre.current.src=null;

addMessages(selectUser.id,chat)
 imageAccept.current.value=null;
   clearImage.current.setAttribute('hidden','true')
setChat({
     text:"",
        img:null,
        userid:user.id
})
}

  return (
    <div className='addchat-container'>
       <div className="image">
        <img  alt="" ref={imagePre} />
      <p className='clear' hidden ref={clearImage} onClick={()=>{
        imagePre.current.src='null'
         clearImage.current.setAttribute('hidden','true')
         setChat((pre)=>{
            return{
                ...pre,
                img:null
            }
         })
        }}><ClearOutlinedIcon  /></p>  
       </div> 
      <form onSubmit={chatSubmit}>
        <input type="text" name="text" placeholder='Type a message' onChange={textInput} value={chat.text}/>
        <input type="file" name="img" accept='image/*'hidden ref={imageAccept} onChange={handleImage} />
        <BrokenImageOutlinedIcon onClick={()=>imageAccept.current.click()}/>
        <button disabled={isdisable} style={{color:isdisable && 'gray'}}>{addmesLoad ? 'Loadding...' : <SendOutlinedIcon/>}</button>
      </form>
    </div>
  )
}

export default addChat
