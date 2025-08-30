import express from "express";
import { protectRouther } from "../middelware/protecteRouter.js";
import { getLeftuser,getMessage,sendMessage } from "../controller/message.conteroller.js";

const router=express.Router();
router.get('/',protectRouther,getLeftuser);
router.post('/message/:id',protectRouther,getMessage)
router.post('/send/:id',protectRouther,sendMessage)

export default router;