import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from "axios";
// import Button from '../../components/button/Button';
// import Navbar from '../../components/navbar/Navbar';
import swal from "sweetalert";
import style from './RegisterPage.module.scss'

const RegisterPage = () => {
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange = e => {
      
      const {name,value} = e.target
      setUser({
        ...user,
        [name]:value
      })
      
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username,email,password} = user
    if(username && email && password)
    {
      
        const res = await axios.post("http://localhost:5000/api/auth/register",user);
        if(res.data.message==="Password too small")
          swal({title: "Password length should be atleast 6",
          icon: "warning",
          
        });

        else if(res.data.message ==="Same email")
          swal({title: "Already registered with same email id",
            icon: "warning",
            
          });
        else if(res.data.message ==="Same username")
        swal({title: "Already registered with same username!! Try to enter different username",
          icon: "warning",
          
        });
        else if(res.status===200)
        {
          swal.fire({
            icon: 'success',
            title: 'Registered',
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.replace("/login");
        }
        
    }
    else{
      swal({title: "invalid input",
              icon: "info",
              button: "OK!",
            });
    }
    
  };

  return (
    <div className={style.register}>
        <Navbar />
        <div className={style.line}></div>
        <div className={style.register_sidebar}>
            <div className={style.register_sidebar_card}>
              <div className={style.register_sidebar_icon}>
                      <img src="/images/loginicon.png" alt="Error" />
                  </div>
                  <div className={style.register_sidebar_heading}>
                      Welcome to your Dashboard
                  </div>
                  <div className={style.register_sidebar_desc}>
                      Your uploaded APIs will be displayed here once you login to your account   
                  </div>
              </div>
        </div>
        <div className={style.register_body}>
            
            <form action="" className={style.register_form} onSubmit={handleSubmit}>
                <span className={style.register_form_heading}>
                    Create your account
                </span>
              <input 
              className={style.register_input} 
              type="text" 
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              // ref = ""
              />
              <input 
              className={style.register_input} 
              type="text" 
              placeholder="Email address" 
              name ="email" 
              value={user.email}
              onChange={handleChange}
              // ref = ""
              />
              <input 
              className={style.register_input} 
              type="password"
              placeholder="Password (Should be minimum 6 characters long)" 
              name="password"
              value={user.password}
              onChange={handleChange}
              // ref = ""
              />
              <button className={[style.btn, "btn_large"].join(' ')}>  Register </button>
              
            </form>
            <div className={style.register_login}>
              <span className={style.register_login_text}>Already have an account?</span>
                  <Link className='link' to='/Login'>
                      <button className={[style.btn, "btn_small"].join(' ')}> Login</button>
                    
                  </Link>
              </div>


        </div>
    </div>
    )
};

export default RegisterPage;