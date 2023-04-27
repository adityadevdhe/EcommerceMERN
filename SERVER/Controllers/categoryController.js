import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const categoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        console.log("from category controller")
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
        const existingCategory=await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category already exists"})
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"Category Created",
            category
        })
    }catch(error){
        console.log(error);
        req.status(500).send({
            success:false,
            error,
            message:"Error in category"
        })
    }
}
//Update

export const updateCategory=async(req,res)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

export const getcategory=async(req,res)=>{
    try{
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All categories List",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting categories"
        })
    }
}

export const singleCategory=async(req,res)=>{
    try{
        const category=await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            category
        })
    }catch(error){
console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error occured"
        })        
    }
}

export const deleteCategory=async(req,res)=>{
    try{
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Deleted"
        })
    }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Error occured"
        }) 
    }
}