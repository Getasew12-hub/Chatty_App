import React, { useEffect } from 'react'
import "./auth.css"
import { useState } from 'react'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useRef } from 'react';
import userStore from '../../store/userAuthStore';
import { Link } from 'react-router-dom';


function signup() {
const {lodding,signUp}=userStore()


  const visible=useRef();
  const notvisible=useRef()
    const [show,setShow]=useState(false);
    const [formValue,setFormValue]=useState({
        fullname:'',
        email:'',
        password:''
    });

    function formInput(e){
        const {name,value}=e.target;
        setFormValue((pre)=>{
            return{
                ...pre,
                [name]:value.trimStart(),
            }
        })
    }

    function sendForm(e){
        e.preventDefault();
       
        signUp(formValue)
    }

    function  passwordHandler(){
        setShow(!show)
    }
   
  return (
    <div className='form-container'>
         <div className="signup-form">
           <p className='iconform'> <ChatBubbleOutlineOutlinedIcon className='icon'/></p>
            <h1>Create Account</h1>
            <p>Get start with you free account</p>
            
            <form onSubmit={sendForm}>
                <div>
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" name="fullname"  placeholder='Getasew Tewachew'  required  onChange={formInput} />
                   <PersonOutlineOutlinedIcon className='icon' />
                </div>

                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  placeholder='you@gmail.com'  required
                    onChange={formInput}/>
                   <EmailOutlinedIcon className='icon'  />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type={show? 'text' :"password"} name="password"  placeholder='*******'  required
                    onChange={formInput}/>

                    <LockOutlinedIcon className='icon'  />

                   {show ? <p className='password-visiblity'  ref={visible} onClick={passwordHandler} > <RemoveRedEyeOutlinedIcon 
                       /></p>:
                   <p className='password-visiblity'  ref={notvisible} onClick={passwordHandler}> <VisibilityOffOutlinedIcon  /></p>}
                    
                </div>

             
         
             <button>
              {lodding ?   "Loadding...": "Sign up"}
                </button>
            </form>
         
            <p>I already have an accout?
                <Link to={"/login"}><span>Login <ArrowForwardOutlinedIcon/></span>  </Link> </p>
        </div>
        <div className="rightbform">
            <div className='item'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              
            </div>
            <h1>Join our community</h1>
            <p>Connect with friends,share momemts,and stay in touch with <br /> your loved ones</p>
        </div>
    </div>
  )
}

export default signup
