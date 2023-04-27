import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';

import '../../../src/App.css';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
    const[email,setEmail]=useState("");
    const[newpassword,setNewpassword]=useState("");
    const[question,setQuestion]=useState("");
    
    const navigate =useNavigate();
    const location =useLocation();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`,{email,newpassword,question});
            if(res.data.success){
                toast.success(res.data.message);
                
                navigate("/login")
                ;
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
   <Layout>
      <div className="register">
      <h1>Forgot Password</h1>
      <form className='infoform auth-form' onSubmit={handleSubmit}>
            
            
            <div>
                <input type="email" placeholder='Email' className='infoInput user' name='username' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                <input type="text" placeholder='What is your School name' className='infoInput' name='answer' value={question} onChange={(e)=>setQuestion(e.target.value)} />
                </div>
                <div>
                <input type="password" placeholder='New Password' className='infoInput' name='newpassword' value={newpassword} onChange={(e)=>setNewpassword(e.target.value)} />
                </div>
                
                <button className='btn btn-primary' type='submit'  >
                    Reset
                </button>
            </form>
      </div>
   </Layout>
  )
}

export default ForgotPassword