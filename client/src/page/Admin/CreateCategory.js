import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import toast  from 'react-hot-toast';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from "antd"

const CreateCategory = () => {
  const [categories,setCategories]=useState([]);
  const [name,setName]=useState("");
  const [selected,setSelected]=useState(null);
  const [updatedname,setUpdatedname]=useState("")
  const [visible,setVisible]=useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_API}/category/create-category`,{name})
      
      if(data?.success){
        toast.success(`${data.name} is created`)
        getAllcategory()
       
      } 
      else{
        toast.error(data.message)
      }
    }catch(error) {
      console.log(error)
      toast.error("Input form error")
    }
  }
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.put(`${process.env.REACT_APP_API}/category/update-category/${selected._id}`,{name:updatedname})
      if(data.success){
        toast.success(data.message)
        setSelected(null)
        setUpdatedname("")
        setVisible(false)
        getAllcategory()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error("Something went wrong")
    }
  }

  const handleDelete=async(id)=>{
    
    try{
      const {data}=await axios.delete(`${process.env.REACT_APP_API}/category/delete-category/${id}`)
      if(data.success){
        toast.success(data.message)
        
        getAllcategory()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error("Something went wrong")
    }
  }

  const getAllcategory=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/category/getallCategor`);
      if(data?.success){
        setCategories(data.category);
      }
    }catch(error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(()=>{
    getAllcategory();
  },[])
  return (
    <>
      <Layout title={"Create Category"}>
      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1>Manage category</h1>
                <div className="p-3 w-50">
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                </div>
                <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {categories?.map((c)=>(
                     <>
                     <tr>
                        <td key={c._id} >{c.name}</td>
                        <td> <button className='btn btn-primary ms-1' onClick={()=>{setVisible(true);setUpdatedname(c.name);setSelected(c)}} >Edit</button> </td>
                        <td> <button className='btn btn-danger ms-1' onClick={()=>{handleDelete(c._id)}}>Delete</button> </td>
                        </tr>
                     </>
                    ))}
                   
                  
                </tbody>
              </table>
                </div>
                <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                  <CategoryForm value={updatedname} setValue={setUpdatedname} handleSubmit={handleUpdate}/>
                </Modal>
            </div>
        </div>
      </Layout>
    </>
  )
                    }

export default CreateCategory