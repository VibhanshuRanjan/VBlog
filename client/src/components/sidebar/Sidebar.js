import React, { useEffect, useState } from 'react'
import style from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import axios from 'axios';


const Sidebar = () => {
  const url = window.location.pathname;
  // console.log(url);
  const [cats,setCats] = useState([]);
  useEffect(()=>{
    const fetchCats = async ()=>{
        const res = await axios.get("http://localhost:5000/api/categories/");
        // console.log(res.data);
        setCats(res.data);
        
    }
    fetchCats();

  },[cats]);

  return (
    <div className={style.sidebar}>
        
        <div className={style.sidebar_items}>
                <div className={style.sidebar_title}>
                  SELECT CATEGORIES
                </div>
                
                <ul className={style.sidebar_categories}>
                <Link className="link" to={url} >
                  <li className={style.cat_none} >
                    None
                  </li>
                  </Link> 
                {cats.map((c)=>(
                   <Link className="link" to={`${url}?cat=${c.name}`} >
                  <li className={style.sidebar_categories_items} >
                    {c.name}
                  </li>
                  </Link>

                ))}      
                       
                </ul>
        </div>
  </div>
  )
}

export default Sidebar
