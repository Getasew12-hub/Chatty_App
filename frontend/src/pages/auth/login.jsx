import React, { useEffect, useState } from 'react'
import "./auth.css"

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


function login() {
const {lodding,login}=userStore()




  const visible=useRef();
  const notvisible=useRef()
    const [show,setShow]=useState(false);
    const [formValue,setFormValue]=useState({
      
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
   
        login(formValue)
    }

    function  passwordHandler(){
        setShow(!show)
    }
   
  return (
    <div className='form-container'>
         <div className="signup-form">
           <p className='iconform'> <ChatBubbleOutlineOutlinedIcon className='icon' /></p>
            <h1>Welcome back!</h1>
            <p>sign in to your account</p>
            
            <form onSubmit={sendForm}>
           

                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  placeholder='you@gmail.com'  required
                    onChange={formInput}/>
                   <EmailOutlinedIcon className='icon'/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type={show? 'text' :"password"} name="password"  placeholder='*******'  required
                    onChange={formInput}/>

                    <LockOutlinedIcon className='icon' />

                   {show ? <p className='password-visiblity'  ref={visible} onClick={passwordHandler} > <RemoveRedEyeOutlinedIcon 
                        /></p>:
                   <p className='password-visiblity'  ref={notvisible} onClick={passwordHandler}> <VisibilityOffOutlinedIcon  /></p>}
                    
                </div>

             
         
             <button>
              {lodding ?   "Loadding...": "Login"}
                </button>
            </form>
         
            <p>Do no't have an account?
                <Link to={"/signup"}><span>Sig up <ArrowForwardOutlinedIcon/></span>  </Link> </p>
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
            <h1>Welcome back!</h1>
            <p>Sign in to continue your conversations and catch up with your  <br />  messages. </p>
        </div>
    </div>
  )
}

export default login
