import db from "../libe/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { v2 as cloudinary } from 'cloudinary';


env.config()

const salt=10;

  function genereatToken(user){

const Token=jwt.sign({id:user},process.env.ACCESS_SECRET_KEY,{expiresIn:'7d'});

return {Token}


}

const setCookies=async (res,token) => {
  
    res.cookie('jwt',token,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:1000*60*60*24*7
    })
}

export const signup =async (req,res) => {
    try {
       const {fullname,email,password}=req.body;
       console.log(req.body)
if(!fullname || !email || !password) return res.status(404).json({error:"All input is requere,please insert all input"});
if(password.length<6) return res.status(404).json({error:"Password length must to be greater than 5"});


const response=await db.query("SELECT * FROM userinfo WHERE email=$1;",[email]);

if(response.rows.length>0)  return res.status(404).json({error:"User is already exsit,please login"});
  const bcryptResponse=await bcrypt.hash(password,salt);
  if(bcryptResponse){
    const newUser=await db.query("INSERT INTO userinfo(fullname,email,password) VALUES($1,$2,$3) RETURNING *;",[fullname,email,bcryptResponse]);
    const user=newUser.rows[0];
   
  
     const {Token}=await genereatToken(user.id);
  
  
   setCookies(res,Token);
   return res.status(200).json(user)

  }else{
    return res.status(500).json({error:"Internal sever error"});
  }
        
    } catch (error) {
        console.log('erron on sighup ',error.message);
        return res.status(500).json({error:'internal server error'})
}
}


export const login =async (req,res) => {
  try {
    const {email,password}=req.body;
    if(!email || !password) return res.status(404).json({error:"Please insert all values"});
    const userInfo=await db.query("SELECT * FROM userinfo WHERE email=$1;",[email]);
    if(userInfo.rows.length>0){
        const user=userInfo.rows[0];
      
      const passwordAuth=await bcrypt.compare(password,user.password);
      
      if(passwordAuth){
        
        const {Token}=await genereatToken(user.id);
        
       

         
   setCookies(res,Token);
   return res.status(200).json(user)
      }else{
        return res.status(404).json({error:'Incorrect password'});
      }
    }else{
        return res.status(404).json({error:"User is not found"})
    }
  } catch (error) {
    console.error("error on login",error.message);
    return res.status(500).json({error:"Internal server error"});
  }
}
export const logout =async (req,res) => {
    try {
       
     const cookieOptions={
        httpOnly:true,
        sameSite:'none',
        secure:true,
        path:'/',
     }
      res.clearCookie('jwt',cookieOptions);
         return res.status(200).json({message:"Logout seccessfully"})
    } catch (error) {
      console.log('error on logout',error.message);
      return res.status(500).json({message:'Internal server error'})
    }
}

export const updateProfile=async (req,res) => {
    try {
        let {fullname,img}=req.body;
            
        if(!fullname && !img) return res.status(200)
        if(img){
            if(req.user.profilepic){
              
          await  cloudinary.uploader.destroy(req.user.profilepic.split('.').pop('').split('.')[0]);
        }
          const cloundanryupload=await cloudinary.uploader.upload(img,{folder:'chatApp'});
          img=cloundanryupload.secure_url;
          
        }
 fullname=fullname  || req.user.fullname;
 



      const update=  await db.query('UPDATE userinfo  SET fullname=$1,profilepic=$2 WHERE id=$3 RETURNING *; ',[fullname,img || req.user.profilepic,req.user.id])

        return res.status(201).json(update.rows[0])
    } catch (error) {
       console.log('error on update profile',error.message);
       return res.status(500).json('Internal server error')
    }
}

export const user=async (req,res) => {
    try {
       return res.status(200).json(req.user) 
    } catch (error) {
        console.log('error on user',error.message);
        res.status(500).json("Internal server error")
    }
}