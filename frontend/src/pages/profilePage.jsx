import React, { useEffect, useRef, useState } from 'react'
import "./profilePage.css"


import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import userStore from '../store/userAuthStore';


function profilePage() {
   const {profile,editLoad,user}=userStore()



   const [editName,setedit]=useState(false)
   const [changename,setname]=useState(user.fullname)
  const [imageApload,setImage]=useState(user.profilepic);
  const imageAccept=useRef()

 

  function imagehandler(e){
const file=e.target.files[0];
if(file){

  const render=new FileReader();
  render.readAsDataURL(file);

  render.onload=(e)=>{
    setImage(e.target.result);
    const img=e.target.result
    const id=1
    profile({img,id})

  }
}
  }

  function editname(){
    const fullname=changename;
     const id=2
        profile({fullname,id})
  }
  return (
    <div className='profile-container'>
      <div className="header">
         <h1>Profile</h1>
         <h4>Your profile information</h4>
         <div className="imgae">
          <div className="item">
        {imageApload ? <img src={imageApload} alt="" loading='lazzy' />:
          <p className='nameFirst' >{user.fullname.charAt(0).toUpperCase()}</p>}

          <p className='icon' onClick={(e)=> imageAccept.current.click()}><CameraAltOutlinedIcon /></p>


          <input type="file" name="img"  accept='image/*' hidden  ref={imageAccept} onChange={imagehandler}/>
          </div>
         </div>
         <p>{editLoad==1 ? "Loadding..." :"Click the camera icon to update your photo"}</p>
      </div>
      <div className="bottom">
       
        <div className="name item">
           <p className='lable'>Full Name</p>
          <PersonOutlineOutlinedIcon className='icon'/>
         {!editName ? <p>{user.fullname}</p>:
           <input type="text" name="fullname" value={changename} autoFocus onChange={(e)=> setname(e.target.value.trimStart())} />}

        {!editName? editLoad==2 ? <p className='edit' >Lodding...</p> :<EditOutlinedIcon className='edit' onClick={()=> setedit(true)}/> :<CheckOutlinedIcon className='edit' onClick={()=>{
          editname()
           setedit(false)}}/>}
        
        </div>
       
        <div className="email item">
           <p className='lable'>Email</p>
          <MailOutlineOutlinedIcon className='icon'/>
          <p>{user.email}</p>
        </div>

        <h2>Account information</h2>

        <div className='account member'>
          <p>Member since</p>
          <p>{user.create_at.split('T')[0]}</p>
        </div>

        <div className='account'>
          <p>Account status</p>
          <p style={{color:"mediumseagreen"}}>Active</p>
        </div>
      </div>
    </div>
  )
}

export default profilePage
 