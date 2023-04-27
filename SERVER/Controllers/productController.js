import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'

export const createproduct=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"description is required"});
            case !price:
                return res.status(500).send({error:"price is required"});
            case !category:
                return res.status(500).send({error:"category is required"});
            case !quantity:
                return res.status(500).send({error:"qunatity is required"});   
            case !photo && photo.size>10000:
                return res.status(500).send({error:"Photo is required"});      
        }
        const  product=await productModel({...req.fields,slug:slugify(name)})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type
        }
        await product.save();
        res.status(201).send({
            success:true,
            message:"Product created successfully",
            product,
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

export const getProduct=async(req,res)=>{
    try{
        const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            total:products.length,
            message:"All products",
            products
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
export const getSingleProduct=async(req,res)=>{
    try{
        const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success:true,
            
            message:"All products",
            product
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
export const productphoto=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error occured"
        })
    }
}
export const deleteProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product deleted"
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
export const updateproduct=async(req,res)=>{
    try{
        const {name,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"description is required"});
            case !price:
                return res.status(500).send({error:"price is required"});
            case !category:
                return res.status(500).send({error:"category is required"});
            case !quantity:
                return res.status(500).send({error:"qunatity is required"});   
                  
        }
        const  product=await productModel.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type
        }
        await product.save();
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            product,
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

export const productFilter=async(req,res)=>{
    try{
        const {checked,radio}=req.body;
        let args={}
        if(checked.length>0) args.category=checked
        if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}
        const products=await productModel.find(args)
        res.status(200).send({
            success:true,
            products
        })

    }catch(error){
        console.log(error)
        res.status(400).send({
           success:false,
           message:"Error occured",
           error 
        }
        )
    }
}
export const productCount=async(req,res)=>{
    try{
        const count=await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            count
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            message:"Error in product count",
            success:false,
            error
        })
    }
}
export const productPage=async(req,res)=>{
    try{
        const perPage=6
        const page=req.params.page? req.params.page:1
        const products=await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error
        })
    }
}