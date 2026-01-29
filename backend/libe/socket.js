import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin: ['http://localhost:3000']
    }
})

export function reciverSoketId(userid){
    return connectionMap[userid];
};
export function typingResiver(userid){
return connectionMap[userid]
}
const connectionMap={};
io.on('connection',(Socket)=>{
         
    const userId=Socket.handshake.query.userId
    

    if(userId) connectionMap[userId]=Socket.id;
    io.emit('connecteduser',Object.keys(connectionMap));

Socket.on('typing',(userid)=>{
   
    const user=connectionMap[userid];
     
    if(user) io.to(user).emit('typingnow',userid);
    
})
  
    Socket.on('disconnect',()=>{
      
        delete connectionMap[userId]
         io.emit('connecteduser',Object.keys(connectionMap));
    })
})

export {io,server,app}