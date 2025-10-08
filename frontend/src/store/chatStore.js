import { create } from "zustand";
import axios from "../libe/axios";
import toast from "react-hot-toast";
import userStore from "./userAuthStore";
const chatStore=create((set,get)=>({
    message:[],
    users:[],
    selectUser:null,
    isUserlodding:false,
    isMesssageLoad:false,
    addmesLoad:false,
    scrollValue:null,
    typing:false,
    offcet:0,
    finalLoadMessage:false,
   SmallLoad:false,
   ScrollWork:true,
 call:true,
    getUsers:async () => {
       if(get().users.length>0) return;
        set({isUserlodding:true})
        try {
           
           const res=await  axios.get('/message');
           
           set({users:res.data});
        } catch (error) {
            console.log('error on get users',error)
        }finally{
             set({isUserlodding:false})
        }
    },
    getMessages:async (val) => {
       
         if(get().selectUser?.id!==val.id){
         
            set({message:[],finalLoadMessage:false,offcet:0,addmesLoad:false})
         }
        set({isMesssageLoad:true,selectUser:val,ScrollWork:false,SmallLoad:false});
      
        const id=val?.id;
        try {
             const offcet=get().offcet;
           
            const res=await axios.post(`/message/message/${id}`,{offcet});
       
            // console.log("the respone data is this now i get most",res.data)
            set({offcet:get().offcet+res.data.length})
            set({message:res.data,call:true})
        } catch (error) {
            console.log("error on get message ",error)
        }finally{
            set({isMesssageLoad:false})
        }
        
    },
    getPreviosMessage:async (val) => {
         if(get().finalLoadMessage) return
              
            if(get().selectUser.id!==val.id){
            set({message:[],finalLoadMessage:false,offcet:0,addmesLoad:false})
         }
         set({SmallLoad:true,ScrollWork:false,call:false})
         const id=val?.id;
             
        try {
         
           
             const offcet=get().offcet;
            const res=await axios.post(`/message/message/${id}`,{offcet});
           
             if(res.data.length==0){
              return set({finalLoadMessage:true,SmallLoad:false,call:false})
             }
        set({offcet:get().offcet+res.data.length})

             set({SmallLoad:false})
            set({message:[...get().message,...res.data],call:true})
        
        } catch (error) {
            console.log('error on ger previos message',error);
              set({SmallLoad:false})
        }
    },
    addMessages:async (id,val) => {
        
         set({addmesLoad:true,ScrollWork:true})
        try {
            let {text,img}=val
        
              set((pre)=>({
            message:[val,...pre.message]
          }))
          console.log("the new messages :",get().message)
          const res= await axios.post(`/message/send/${id}`,{text,img}) 
            set({offcet:get().message.length})
          set((pre)=>{
            const newmessage=pre.message.slice(1);
           
             return{
                message:[res.data,...newmessage]
             }
        })
           set({addmesLoad:false})
        } catch (error) {
             set({addmesLoad:false})
            toast.error("Faild add messages")
        }
    },
   onlinechat:()=>{
    const selcteuser=get().selectUser;

    if(!selcteuser) return;
    const socket=userStore.getState().socket;
   
     
    socket.on('nesMessage',(message)=>{
        
        if(message.userid!==selcteuser.id) return
        
        set((pre)=>({
            message:[message,...pre.message]
        }))
    })
   },
   removeOnlichat:()=>{
     const socket=userStore.getState().socket;
     socket.off('nesMessage')
   },

   typingNoti:(id)=>{
   
    const socket=userStore.getState().socket;
    socket.emit('typing',id)
   

  
   },
   getTipingNoti:()=>{
      const socket=userStore.getState().socket;
 socket.on('typingnow',(res)=>{
      
        set({typing:true})
    })
   },
   removeinping:()=>{
const socket=userStore.getState().socket;
socket.off('typingnow')

  set({typing:false})
   },
   Cleartyping:()=>{
     set({typing:false})
   },
   BackArrow:()=>{
    
    set({selectUser:null})
   },
   Scrollmotion:(val)=>{
   
set({scrollValue:val})
   }



}))

export default chatStore;