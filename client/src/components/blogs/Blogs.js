import React from 'react'
import BlogCard from '../blogCard/BlogCard';
import style from "./Blogs.module.scss";

const Blogs = ({blogs}) => {
    return (
    <div className={style.blogs}>
        { 
        blogs.map((b) => (
        <BlogCard blog={b} />
        ))}    
    </div>
    )
}

export default Blogs