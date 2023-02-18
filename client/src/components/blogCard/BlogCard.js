import React from 'react';
import style from './BlogCard.module.scss';
import { Link } from "react-router-dom";
import { BASE_API_URL } from '../../utils/constants';

const BlogCard = ({blog}) => {
  const PF = `${BASE_API_URL}/images/`
  return (
      <div className={style.blogCard}>
            <div className={style.b_line}></div>
            <div className={style.blogCard_info}>
                <Link to={`/blog/${blog._id}`} className="link">
                    <div className={style.img_card}>
                        {blog.photo && <img className={style.blog_img} src={PF + blog.photo} alt='blog image' />}
                        
                    </div>
                </Link>
                
                <div className={style.blog_info}>
                    <div className={style.blog_categories}>
                    
                        {blog.categories.map((c) => (
                            <Link className="link" to={`/?cat=${c}`} >
                                <button className={style.category_btn}>
                                <div >{c}</div>
                                </button>
                            
                            </Link>
                        ))}
                    
                        
                        
                    </div>
                    <Link to={`/blog/${blog._id}`} className="link">
                        <div className={style.blog_title}>
                        {blog.title}
                        </div>
                    </Link>
                    

                    <div className={style.blog_date}>
                    {new Date(blog.createdAt).toDateString()}
                    </div>

                    <p className={style.blog_desc}>
                    {blog.desc} 
                </p>
                </div>            
            </div>
            
      </div>
    
  )
}

export default BlogCard