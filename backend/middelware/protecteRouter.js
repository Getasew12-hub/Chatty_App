import db from "../libe/database.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config()

export const protectRouther=async (req,res,next) => {
    try {
      const token=req.cookies.jwt;
      
      if(!token) return res.status(401).json('Unautorize');

    const decode=jwt.verify(token,process.env.ACCESS_SECRET_KEY);
    if(!decode)  return res.status(401).json('Invalid token');

    const decodeuser=await db.query('SELECT * FROM userinfo WHERE id=$1;',[decode.id]);
       const user=decodeuser.rows[0]
    req.user=user;
    next()
    } catch (error) {
       console.log('error on protecte routher',error.message) ;
       return res.status(401).json('Internal server error');
    }
}