import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';

import '../../../src/App.css';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [auth,setAuth]=useAuth();
    const navigate =useNavigate();
    const location =useLocation();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/auth/login`,{email,password});
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || "/")
                console.log("done");
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
    <div>
        <Layout title="login">
        <div className="register">
            <h1>Login</h1>
        <form className='infoform auth-form' onSubmit={handleSubmit}>
            
            
            <div>
                <input type="email" placeholder='Email' className='infoInput user' name='username' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                <input type="password" placeholder='Password' className='infoInput' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                <button className='btn btn-primary' type='button' onClick={()=>{navigate('/forgot-password')}} >
                    Forgot Password
                </button>
                
                <button className='btn btn-primary' type='submit'  >
                    Submit
                </button>
            </form>
        </div>
        
        </Layout>
    </div>
  )
}

export default Login