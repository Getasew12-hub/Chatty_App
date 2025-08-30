import db from "../libe/database.js";
import {v2 as cloudinary} from "cloudinary"
import { io,reciverSoketId,typingResiver} from "../libe/socket.js";
export const getLeftuser=async (req,res) => {
    try {
        const user=await db.query('SELECT id, email,fullname,profilepic FROM userinfo WHERE id!=$1;',[req.user.id]);
        return res.status(200).json(user.rows)
        
    } catch (error) {
        console.log('error on get left user',error.message);
        return res.status(500).json('Internal sever error')
    }
}

export const getMessage=async (req,res) => {
    try {
        
        const reciver=parseInt(req.params.id);
       const {offcet}=req.body
        const myid=req.user.id;
      
        const message=await db.query('SELECT * FROM messages WHERE (userid=$1 AND touser=$2) OR (userid=$3 AND  touser=$4 ) ORDER BY create_at DESC LIMIT 10 OFFSET $5;',[myid,reciver,reciver,myid,offcet]);

  

        return res.status(200).json(message.rows)

       
        
    } catch (error) {
        console.log('error on get message',error.message);
        return res.status(500).json('Internal sever error')
    }
}

export const sendMessage=async (req,res) => {
    try {
        let {text,img}=req.body;
        const reciver=parseInt(req.params.id);
        const sender=req.user.id;
     
    if(img){
        const uploadurl=await cloudinary.uploader.upload(img);
        img=uploadurl.secure_url;
    }
    
   const addMeassge= await db.query('INSERT INTO messages(userid,touser,text,img) VALUES($1,$2,$3,$4) RETURNING *;',[sender,reciver,text,img || null]);

  const reciverSoketid=reciverSoketId(reciver);
 if(reciverSoketid){
         io.to(reciverSoketid).emit('nesMessage',addMeassge.rows[0])
}
  return res.status(200).json(addMeassge.rows[0])

    } catch (error) {
         console.log('error on send message',error.message);
        return res.status(500).json('Internal sever error')
    }
}

