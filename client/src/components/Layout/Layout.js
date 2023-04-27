import React from 'react'
import Header from './Header'
import Footer from './Footer';
import '../../../src/App.css';
import {Helmet} from 'react-helmet';
import {ToastContainer} from 'react-toastify';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author}></meta>
                <title>{title}</title>
                
            </Helmet>
        <Header/>
        <main style={{minHeight:"70vh"}}>
          <ToastContainer/>
        {children}
        </main>
        <Footer/>
        
    </div>
    
  );
};
Layout.defaultProps={
  title:"Apna Cart",
  description:"MERN stack project",
  keywords:"MongoDB, Express, React, Nodejs",
  author:"Aditya Devdhe",
};

export default Layout