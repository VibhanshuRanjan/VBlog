import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Avatar } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import style from './BlogPage.module.scss'
import Navbar from "../../components/navbar/Navbar";
import { BASE_API_URL } from '../../utils/constants';
const BlogPage = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    // console.log(path);
    const [blog, setBlog] = useState({});
    const user = localStorage.getItem('user');
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const handleDelete = async () => {
        try {
          await axios.delete(`${BASE_API_URL}/api/blogs/${blog._id}`, {
            data: { username: user },
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
    const handleUpdate = async () => {
    try {
        await axios.put(`${BASE_API_URL}/api/blogs/${blog._id}`, {
        username: user,
        title,
        desc,
        });
        setUpdateMode(false)
    } catch (err) {}
    };

    useEffect(() => {
        const getBlog = async () => {
          const res = await axios.get(`${BASE_API_URL}/api/blogs/` + path);
          setBlog(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
          console.log(res.data)
          
        };
        getBlog();
      }, [path]);
    const PF = `${BASE_API_URL}/images/`
    return (
        <div className={style.blogPage}>
            <Navbar />
            <div className={style.line_shadow} />
            <div className={style.single_blog}>
            
                <div className={style.author}>
                    <Avatar src='/images/p1.jpeg'/>
                    <div className={style.author_info}>
                        <div className={style.author_name}>
                            <Link to={`/?user=${blog.username}`} className="link">  
                                <b>{blog.username}</b>
                            </Link>
                            
                        </div>
                        <div className={style.publish_date}>
                            {new Date(blog.createdAt).toDateString()}
                        </div>
                        
                    </div>
                </div>
                
                <img
                className={style.post_image}
                src={PF + blog.photo}
                alt="thums"
                />

                {/* Title update */}
                {updateMode ?(
                    <div>
                    <div className={style.update_label}>
                    Title:
                    </div>

                    
                    <input
                    type="text"
                    value={title}
                    className={style.blog_title_input}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                ):(
                    
                    <h1 className={style.post_title}>
                    {title}
                    {
                        (blog.username===user)&&(

                            <div className={style.blog_update}>
                                <div className={style.edit_options}>
                                    Update post:
                                    <UploadFileIcon className={style.blog_icon_up} onClick={() => setUpdateMode(true)} />
                                </div>
                                <div className={style.edit_options}>
                                    Delete post:
                                    <DeleteIcon className={style.blog_icon_del} onClick={handleDelete}/>
                                </div>

                            
                            </div>
                        )
                    }
                    
                    </h1>
                )}

            {updateMode ? (
                <div>
                    <div className={style.update_label}>
                    Description:
                    </div>
                <textarea
                    className={style.blog_desc_input}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                </div>
            ) : (
                <p className={style.blog_desc}>
                    {desc}
                <br />
                
                </p>
            
            )}
                
                {updateMode && (
                <button className={style.update_btn} onClick={handleUpdate}>
                    Update
                </button>
                )}   
                
            </div>
           
        </div>
        
      );
}

export default BlogPage