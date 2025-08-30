import express from "express";
import { signup,login,logout,updateProfile ,user} from "../controller/auth.controller.js";
import { protectRouther } from "../middelware/protecteRouter.js";
const routher=express.Router()
routher.post("/signup",signup)
routher.post("/login",login)
routher.post("/logout",logout)
routher.post("/updatePeofile",protectRouther,updateProfile)
routher.get("/user",protectRouther,user)
export default routher;