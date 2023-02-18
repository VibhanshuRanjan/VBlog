import React from 'react'
import { useEffect, useState } from "react";
import Navbar from '../../components/navbar/Navbar'; 
import Footer from '../../components/footer/Footer';
import SBlogCard from '../../components/sBlogCard/SBlogCard';
import Blogs from '../../components/blogs/Blogs';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from './AllBlogPage.module.scss';
import { BASE_API_URL } from '../../utils/constants';

const AllBlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const { search } = useLocation(); 
    
  
useEffect(() => {
    const fetchallBlogs = async () => {
        // console.log("Adkls");
        const res = await axios.get(`${BASE_API_URL}/api/blogs/`+search);
        console.log(search);
        setBlogs(res.data);
    };
    fetchallBlogs();
    }, [search]);
  return (
    <div>
        <Navbar/>
        <div className={style.all_blogs}>
            <div className={style.all_blogs_body}>
                <div className={style.all_blogs_blog}>
                    { 
                    blogs.map((b) => (
                    <SBlogCard blog={b} />
                    ))
                    }
                </div>
                
            </div>
           <div className={style.all_blogs_sidebar}>
                <Sidebar />
           </div>
          
        </div>
        <Footer/>
    </div>
  )
}

export default AllBlogPage