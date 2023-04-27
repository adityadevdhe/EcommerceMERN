import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import '../../src/App.css';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices';
const Homepage = () => {
  const[auth,setAuth]=useAuth()
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  //Get total

  const getTotal=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-count`)
      setTotal(data?.count)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if(page===1) return; loadmore();
  },[page])

  //laod more
  const loadmore=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data.products])
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id)
    }else{
      all=all.filter(c=>c!==id)
    }
    setChecked(all)

  }
  const getproducts=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products);
      console.log("done")
    }catch(error){
      setLoading(false)
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getproducts()
    getTotal()
  },[])
  const getAllcategory=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/category/getallCategor`);
      if(data?.success){
        setCategories(data.category);
      }
    }catch(error) {
      console.log(error);
      
    }
  };
  useEffect(()=>{
    if( !checked.length || !radio.length) getAllcategory();
    
  },[checked.length,radio.length])
  useEffect(()=>{
    if(checked.length || radio.length) filterProducts();
  },[checked,radio])
  //get filtered products
  const filterProducts=async()=>{
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_API}/product/product-filters`,{checked,radio})
      setProducts(data?.products)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
        <Layout title={"All products"}>
          <div className="row mt-3">
            <div className="col-md-2">
              <h4 className='text-center'>Filter by cateory</h4>
              <div className="d-flex flex-column">
              {categories?.map(c=>(
                <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)}>
                  {c.name}
                </Checkbox>
              ))}
              </div>
              <h4 className='text-center mt-4'>Filter by price</h4>
              <div className="d-flex flex-column">
               <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {Prices.map(p=>(
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
               </Radio.Group>
              </div>
              <div className="d-flex flex-column">
               <button className='btn btn-danger' onClick={()=>window.location.reload()}>Clear filters</button>
              </div>

            </div>
            <div className="col-md-9">
              {JSON.stringify(radio,null,4)}
              <h1 className='text-center'>All products</h1>
              <div className="d-flex flex-wrap">
              {products?.map(p=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                      <div className="card m-2" style={{width:"18rem"}} key={p._id}>
                    <img src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.price}</p>
                      <button  class="btn btn-primary ms-1">More Details</button>
                      <button  class="btn btn-secondary ms-1">Add to cart</button>
                    </div>
                  </div>
                    </Link>
                ))}
              </div>
              <div>
                <div className='m-2 p-3'>{products && products.length < total && (
                  <button className='btn btn-warning' 
                  onClick={(e)=>{
                    e.preventDefault();
                    setPage(page+1)
                  }}>
                    {loading? "Loading ...":"Loadmore"}

                  </button>
                )}</div>
              </div>
            </div>
          </div>
            
        </Layout>
    </div>
  )
}

export default Homepage