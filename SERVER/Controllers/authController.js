import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController=async(req,res)=>{
    
    
    try{
        const {name,email,password,phone,address,question}=req.body;
        
        if(!email)
        {
            return res.send({message:"Email is required"})
        }
        if(!password)
        {
            return res.send({message:"Password is required"})
        }
        if(!phone)
        {
            return res.send({message:"Phone number is required"})
        }
        if(!address)
        {
            return res.send({message:"Address is required"})
        }
        if(!question)
        {
            return res.send({message:"Answers is required"})
        }
        const existinguser= await userModel.findOne({email});
        if(existinguser){
            return res.status(200).send({
                success:true,
                message:"Already registered Please login"
            })
        }
        const hashedPass=await hashPassword(password)
        const user= new userModel({name,email,phone,address,password:hashedPass,question}).save();
        res.status(201).send({
            success:true,
            message:"User registered successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
}
export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email  || !password)
        {
            return res.status(404).send({
                success:false,
                message:"Invalid email or passeord"
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not registered"
            })
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token=await JWT.sign({_id:user._id},process.env.JWT_KEY,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message})
    }
}
export const testcontroller=(req,res)=>{
    res.send("Protecteed route")
}

export const forgotpassController=async(req,res)=>{
    try{
        const {email,question,newpassword}=req.body;
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!question){
            res.status(400).send({message:"Question is required"})
        }
        if(!newpassword){
            res.status(400).send({message:"New Password is required"})
        }

        const user=await userModel.findOne({email,question});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or answer"
            })
        }
        const hashed=await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password reset successfully"
        })
        
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }

}