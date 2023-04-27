import express from 'express';
import {forgotpassController, loginController, registerController, testcontroller} from '../Controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router=express.Router();
router.post('/register',registerController)

router.post('/forgot-password',forgotpassController);

router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin, testcontroller)

//protected route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

export default router