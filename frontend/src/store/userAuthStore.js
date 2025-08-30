import {create} from "zustand";
import axios from "../libe/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL=import.meta.mode=='development' ? 'http://localhost:5000' :'/';
const userStore =create((set,get)=>({
    lodding:false,
    user:null,
    checkAuth:true,
    smallLoad:false,
    editLoad:null,
   socket:null,
   onlineUser:[],
   signUp:async (val) => {
    const {password,email,fullname}=val
     if(password.length<6) return toast.error('password needed at least 6 characters')
    set({lodding:true})
    try {
        
       
        const res=await axios.post("/auth/signup",{password,email,fullname});
        set({user:res.data,lodding:false})
        get().connectionSocket()
    } catch (error) {
set({lodding:false})
toast.error(error.response.data.error || "Faild to signup")
        
    }
   },
login:async (val) => {
    set({lodding:true});
    const {password,email}=val
    try {
      const res=await axios.post("/auth/login",{password,email});
      set({user:res.data,lodding:false})
       get().connectionSocket()
    } catch (error) {
        toast.error(error.response.data.error || "Faild to login");
        set({lodding:false})
    }
},
    Checkauth:async () => {
        set({checkAuth:true});
        try {
            const res=await axios.get('/auth/user');
            set({user:res.data,checkAuth:false})
             get().connectionSocket()
        } catch (error) {
            set({checkAuth:false,user:null});
            console.log(error)
        }
    },

    logout:async () => {
        set({smallLoad:true})
        try {
            const res=await axios.post("/auth/logout");
            set({smallLoad:false,user:null})
            toast.success("Successfully logout")
             get().disconnectionSocket()
             location.reload()
        } catch (error) {
            toast.error(error.response.data.error || "Faild to loglut")
            set({smallLoad:false})
        }
    },
    profile:async (val) => {
        
        const {img,fullname,id}=val;
        set({editLoad:id});
        try {
            const res=await axios.post("/auth/updatePeofile",{img,fullname});
            set((pre)=>({
                user:{...pre.user,
                    profilepic:res.data.profilepic,
                    fullname:res.data.fullname,

                },
                editLoad:null
            }))
        } catch (error) {
            set({editLoad:null})
        }
    },

    connectionSocket:async () => {
        const autheuser=get().user;
        if(!autheuser || get.socket?.connected) return;
        const socket=io(BASE_URL,{
            query:{
                userId:autheuser.id
            }
        });
        socket.connect();
        set({socket:socket})
        socket.on('connecteduser',(userId)=>{
            set({onlineUser:userId})
        })
       
    },
    disconnectionSocket:async () => {
     if(get().socket?.connected) get().socket.disconnect();
    },

}))

export default userStore;