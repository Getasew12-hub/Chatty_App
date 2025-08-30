import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import env from "dotenv";

import authRouther from "./routher/auth.routher.js"
import messageRouter from "./routher/message.router.js"
import {app,server} from "./libe/socket.js"
env.config()
const __dirname=path.resolve();

const port=5000;

  cloudinary.config({ 
        cloud_name: 'djcy1qwuy', 
        api_key: process.env.CLOUNDARY_APT_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'10mb'}))
app.use(cookieParser());


app.use('/api/auth',authRouther)
app.use('/api/message',messageRouter)

if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'frontend/dist')));

    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,'fontend','dist','index.html'))
    })
}

server.listen(port,()=>{
    console.log(`server running on port:${port}`)
})