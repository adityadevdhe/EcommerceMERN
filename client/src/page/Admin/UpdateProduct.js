import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useState } from 'react';
import toast  from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const {Option}=Select

const UpdateProduct = () => {
  const navigate=useNavigate()
  const params=useParams()
  const [categories,setCategories]=useState([]);
  const [photo,setPhoto]=useState("");
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [quantity,setQuantity]=useState("");
  const [shipping,setShipping]=useState("");
  const [id,setId]=useState("")
  
  //get single product
  const getSingleProduct=async()=>{
    try{
        const {data}=await axios.get(`${process.env.REACT_APP_API}/product/get-products/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id);
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setCategory(data.product.category._id)
        

    }catch(error){
        console.log(error)
    }
  }
  useEffect(()=>{
    getSingleProduct()
    //eslint-disable-next-line
  },[])

  //Get all categories
  const getAllcategory=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/category/getallCategor`);
      if(data?.success){
        setCategories(data?.category);
      }
    }catch(error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(()=>{
    getAllcategory();
  },[])

  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/get-product");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

  }
  const handleDelete=async()=>{
    try{
      
      const {data}= await axios.delete(`${process.env.REACT_APP_API}/product/delete-product/${id}`)
      if (data?.success) {
        
        toast.success("Product Delted Successfully");
        navigate("/dashboard/admin/get-product");
      } else {
        toast.error(data?.message);
      }
    }catch(error){
      console.log(error)
    }
  }
    return (
    <>
      <Layout title={"Create Product"}>
      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1>Update Products</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder="Select a category" size='large' showSearch 
                  className='form-select mb-3 ' 
                  onChange={(value)=>{setCategory(value)}} value={category} >
                    {categories?.map(c=>(
                      <Option key={c._id} value={c._id} > {c.name} </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label  className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : "Upload Photo"} 
                      <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo ?(
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} 
                        alt="productphoto" height={'200px'} 
                        className='img img-responsive' />
                      </div>
                    ):(
                        <div className="text-center">
                        <img src={`${process.env.REACT_APP_API}/product/product-photo/${id}`} 
                        alt="productphoto" height={'200px'} 
                        className='img img-responsive' />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input type="text" value={name} placeholder='"Write a name'
                    className='form-control'
                    onChange={(e)=> setName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <textarea type="text" value={description} placeholder='"Write a description'
                    className='form-control'
                    onChange={(e)=> setDescription(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="number" value={price} placeholder='"Write a Price'
                    className='form-control'
                    onChange={(e)=> setPrice(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="number" value={quantity} placeholder='"Write a qunatity'
                    className='form-control'
                    onChange={(e)=> setQuantity(e.target.value)} />
                  </div>
                  <Select bordered={false} placeholder="Select shipping" size='large' showSearch 
                  className='form-select mb-3 ' 
                  onChange={(value)=>{setShipping(value)}} value={shipping? "yes":"no"} >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                  <button className='btn btn-danger' onClick={handleDelete} >Delete Product</button>
                </div>
            </div>
        </div>
      </Layout>
    </>
  )
}

export default UpdateProduct