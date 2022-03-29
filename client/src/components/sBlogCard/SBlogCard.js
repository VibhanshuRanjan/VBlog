import React from 'react'
import style from "./SBlogCard.module.scss";
import { Link } from "react-router-dom";

const SBlogCard = ({blog}) => {
  const url = window.location.pathname;
  const PF = "http://localhost:5000/images/";
  return (
    <div className={style.sblogCard}>
        <Link to={`/blog/${blog._id}`} className="link">
      {blog.photo && <img className={style.sblogImg} src={PF + blog.photo} alt="" />}
      </Link>
      <div className={style.sblogInfo}>
        <div className={style.sblogCats}>
          {blog.categories.map((c) => (
            <Link className="link" to={`${url}?cat=${c}`} >
            <span className={style.sblogCat}>{c}</span>
            </Link>  
          ))}
        </div>
        <span className={style.sblogDate}>
          {new Date(blog.createdAt).toDateString()}
        </span>
        <Link to={`/blog/${blog._id}`} className="link">
          <span className={style.sblogTitle}>{blog.title}</span>
        </Link>
        <hr />
        
      </div>
      <p className={style.sblogDesc}>{blog.desc}</p>
    </div>
  )
}

export default SBlogCard