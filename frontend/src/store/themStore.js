import { create } from "zustand";

const themStore=create((set,get)=>({
    them:localStorage.getItem('them') || 'dark',
    setThem:(val)=>{
        localStorage.setItem('them',val);
        set({them:val})
    }
}))

export default themStore;