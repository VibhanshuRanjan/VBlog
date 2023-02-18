import React, { useState,useContext } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import style from './PublishPage.module.scss'
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { AuthContext } from "../../helper/authContext";
import { BASE_API_URL } from '../../utils/constants';


const PublishPage = () => {
//   const { userstate,setUserstate } = useContext(AuthContext);
  const user = localStorage.getItem("user");
//   console.log(user);
  const [categories,setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
 
  
  const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
        }
        console.log(selectedImage);
        // console.log(user);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("username");
        // console.log(userstate.username);
        const newPost = {
            username: user,
            title,
            desc,
            categories,
            
        };
        // if (selectedImage) {
            
        //     // newPost.photo = selectedImage;
            
            
        // }
        if (selectedImage) {
            const data =new FormData();
            const filename = Date.now() + selectedImage.name;
            data.append("name", filename);
            data.append("file", selectedImage);
            newPost.photo = filename;
            try {
              const res = await axios.post(`${BASE_API_URL}/api/upload`, data);
              console.log(res);
            } catch (err) {}
          }
          try {


            const cats = await axios.get(`${BASE_API_URL}/api/categories/`);
                // console.log(cats);
                
                categories.map((c)=>{
                  let present = false;
                  cats.data.map((cat)=>{
                    if(cat.name===c)
                      present = true;
                  })
                  if(!present)
                  {
                    // console.log("efg");
                    axios.post(`${BASE_API_URL}/api/categories/`,{name:c})
                    .then((res)=>{
                      console.log(res);
                    });
                    // console.log("kdls skld");
                  }
                })
                
                const res = await axios.post(`${BASE_API_URL}/api/blogs`, newPost);
                console.log(res.data);
                window.location.replace("/blog/" + res.data._id);
            } catch (err) {
                console.log(err);
            }

        //     const res = await axios.post("/posts", newPost);
        //     window.location.replace("/post/" + res.data._id);
        //   } catch (err) {}
        };

        // try {
        //     const cats = await axios.get("http://localhost:5000/api/categories/");
        //     // console.log(cats);
            
        //     categories.map((c)=>{
        //       let present = false;
        //       cats.data.map((cat)=>{
        //         if(cat.name===c)
        //           present = true;
        //       })
        //       if(!present)
        //       {
        //         // console.log("efg");
        //         axios.post("http://localhost:5000/api/categories/",{name:c})
        //         .then((res)=>{
        //           console.log(res);
        //         });
        //         // console.log("kdls skld");
        //       }
        //     })
            
        //     const res = await axios.post("http://localhost:5000/api/blogs", newPost);
        //     console.log(res.data);
        //     window.location.replace("/blog/" + res.data._id);
        // } catch (err) {
        //     console.log(err);
        // }
    


  var category = [
      { id:'1', name:'Tech',  selected:0 },
      { id:'2', name:'Music',  selected:0 },
      { id:'3', name:'Food',  selected:0 },
      { id:'4', name:'Travel',  selected:0 },
      { id:'5', name:'Lifestyle',  selected:0 },
      { id:'6', name:'Vacations',  selected:0 },
      { id:'7', name:'Sports',  selected:0 },
      { id:'8', name:'Cultural',  selected:0 },
    ]

    function f() {
        var selected = [];
        for (var option of document.getElementById('custom_select').options)
        {
            if (option.selected) {
                selected.push(option.value);
            }
        }
       setCategories(selected);
        
    }
    
  return (
    <div className={style.publishPage}>
    <Navbar />
    {/* <div className="line_shadow" /> */}
    <div className={style.publish_body}>
        <form className={style.blog_form} onSubmit={handleSubmit} >
            <div className={style.blog_form_wrap}>
                <div className={style.blog_form_input}>
                { selectedImage?(
                    <img
                    className={style.upload_img}
                    src={URL.createObjectURL(selectedImage)}
                    alt="Thumb"
                    />
                ):(
                    <img
                    className={style.upload_img}
                    src="https://cdn.pixabay.com/photo/2017/05/30/03/58/blog-2355684__340.jpg"
                    alt=""
                    />
                )}
                    
                    <div className={style.upload_title_wrap}>
                        <label htmlFor="file_input">
                            <AddPhotoAlternateIcon className={style.upload_icon}></AddPhotoAlternateIcon>
                        </label>
                            
                        <input id="file_input" type="file" onChange={imageChange} accept="image/*" style={{ display: "none" }} />
                        <input
                        className={style.text_input}
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                        />   
                    </div>
                    
                            <button className={style.publish_btn} type="submit">
                                Publish
                            </button>
                            

                    <div className={style.blog_textarea}>
                        <textarea
                        className={style.blog_textarea_input}
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={e=>setDesc(e.target.value)}
                        />
                    </div>
                </div>
            
                

            </div>
            
            <div className={style.select_category} onClick={f}>
                <label for="custom_select" className={style.select_text}>Choose relevant categories    (Press Ctrl for multiple selection):</label>
                <select id="custom_select" className={style.custom_select_box} multiple>  
                    {
                        
                        category.map(x =>{
                            return <option value={x.name} className={style.option_value}> {x.name} </option>
                        })
                    }
                </select>

                <div id={style.selected_category}>
                    <p className={[style.selected_text_title, "selected_text"].join(' ')} >Selected Categories are:</p>
                    {
                        categories.map(x=>{
                            return <p className={style.selected_text}>{x}</p>
                        })
                    }

                </div>
            </div>
            
        </form>
    </div>
    </div>
    
  );
}

export default PublishPage