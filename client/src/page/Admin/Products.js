import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'

import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../../../src/App.css'
const Products = () => {
    const [products,setProducts]=useState([])
    const getProducts=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_API}/product/get-products`)
            setProducts(data.products);
            console.log("done")
        }catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
        getProducts();
    },[])
    return (
    <>
     <Layout>
     <div>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Products List</h1>
                <div className="d-flex">
                {products?.map(p=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                      <div className="card m-2" style={{width:"18rem"}} key={p._id}>
                    <img src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>

                    </div>
                  </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    </div>
     </Layout>
        
    
    </>
  )
}

export default Products