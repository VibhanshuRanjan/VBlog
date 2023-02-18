
import { useEffect, useState } from "react";
import React from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import style from './HomePage.module.scss'
import BlogCard from '../../components/blogCard/BlogCard';
import Blogs from '../../components/blogs/Blogs';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import SBlogCard from "../../components/sBlogCard/SBlogCard";
import Social from "../../components/social/Social";
import { BASE_API_URL } from '../../utils/constants';

const HomePage = () => {
  const [blogs_q, setBlogs_q] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [pblogs,setPblogs] = useState([]);
  const { search } = useLocation(); 

  
  useEffect(() => {
    const fetchBlogs = async () => {
      // console.log("ADsd");
      const res1= await axios.get(`${BASE_API_URL}/api/blogs/`+search);
      console.log("Search is here in homepage :",search);
      setBlogs_q(res1.data);
      console.log(res1);

      const res2 = await axios.get(`${BASE_API_URL}/api/blogs/`);
      // setBlogs(res2.data);
      const res3 = res2.data.reverse();
      setPblogs(res3);
    };
    fetchBlogs();
  }, [search]);
  return (
    <div>
        <Navbar />
        <div className={style.header}>
            {/* <img className='home_img' src='/images/bg1.jpeg' /> */}
            <div>
                <span className={style.l_heading}>Create your blog</span>
                {/* <span className='large nofill'>blog</span>   */}
            </div>
            <div className={style.s_heading}>
                Publish your passion
            </div>
            <Link to='/publish'>
              <button className={style.header_btn}>
                          ADD BLOG
              </button>
            </Link>
            
        </div>
        <div className={style.home_body}>
          <Blogs blogs={blogs_q}/>
          <div>
            <Sidebar />
            <Social/>
          </div>
          
        </div>

        <div className={style.all_blog}>
           <div className={style.all_blog_title}>
             Hang onto your memories
           </div>
           <div className={style.all_blog_desc}>
           Save the moments that matter. VBlog lets you safely store thousands of posts, photos, and more for free
           </div>
           <Link to={`/allBlog`} className="link">
           <button className={style.all_blog_btn}>
                          SEE ALL BLOGS
            </button>
            </Link>

        </div>

        <div className={style.p_blog}>
            <div className={style.p_blog_title}>
              Popular Blogs
            </div>
            <div className={style.p_blog_desc}>
            Here are some of the popular blogs rated by VBlog users.
            </div>
            <div className={style.pblogs}>
                { 
                pblogs.map((b) => (
                <SBlogCard blog={b} />
              ))}
            </div>
            
        </div>
        <Footer/>
    </div>
  )
}

export default HomePage