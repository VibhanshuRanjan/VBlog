import React,{useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import swal from "sweetalert2";
import { AuthContext } from "../../helper/authContext";
// import Button from '../../components/button/Button';
import style from './LoginPage.module.scss'

const LoginPage = () => {
    
    const { userstate,setUserstate } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user,setUser] = useState({
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
            // console.log("alkds");
           e.preventDefault();
           const {email,password} = user
           if(email && password){
                const res = await axios.post("http://localhost:5000/api/auth/login",user)
                if(res.data.message==="Email not"){
                    swal.fire({title: "Email not registered",
                    icon: "warning",
                    
                    });
                }
                else if(res.data.message==="Wrong p"){
                    swal.fire
                    ({title: "Wrong password entered!!",
                    icon: "warning",
                    
                    });
                }
                else if(res.status===200){
                    
                    setUserstate(true);
                    localStorage.setItem('user', res.data.username);
                    // const user1 = localStorage.getItem("user");
                    
                    // localStorage.setItem('user', res.data)
                    swal.fire({
                        icon: 'success',
                        title: 'Logged In',
                        showConfirmButton: false,
                        timer: 1000,
                      });
                    navigate("/");
                    
                }     
           }
           else{
            swal.fire({
                icon: 'warning',
                title: "invalid input",
                // showConfirmButton: false,
                // timer: 1000,
              });

                // swal({title: "invalid input",
                //     icon: "info",
                //     button: "OK!",
                // });
           }
           
      };

  return (
      <div className={style.login}>
          <Navbar />
          {/* <Navbar user={false} login={true}/> */}
          <div className="line"></div>
          <div className={style.login_sidebar}>
              <div className={style.login_sidebar_card}>
                    <div className={style.login_sidebar_icon}>
                        <img src="/images/loginicon.png" alt="Error" />
                    </div>
                    <div className={style.login_sidebar_heading}>
                        Welcome to Blogging site
                    </div>
                    <div className={style.login_sidebar_desc}>
                        Uploaded blogs will be displayed here once you login to your account   
                    </div>
                </div>
          </div>
          <div className={style.login_body}>
              
              <form action="" className={style.login_form} onSubmit={handleSubmit}>
                <span className={style.login_form_heading}>
                    Login to your account
                </span>
                <input 
                className={style.login_input} 
                type="text" 
                placeholder="Email address" 
                name="email"
                value={user.email}
                onChange={handleChange}
                // ref = ""
                />
                <input 
                className={style.login_input} 
                type="password" 
                placeholder="Password" 
                name='password'
                value={user.password}
                onChange={handleChange}
                // ref = ""
                />
                <div href="" className={style.forgot} >Forgot Password ?</div> 
                {/* onClick={() => { handleforgetpassword() }} */}
                <button className={[style.btn, "btn_large"].join(' ')}>Login</button>
               
                
              </form>
              <div className={style.register_login}>
                <span className={style.register_login_text}>Donot have an account?</span>
                    <Link className='link' to='/register'>
                        <button className={[style.btn, "btn_small"].join(' ')}>Register</button>
                        {/* <Button  value="Register" color="color_black" size="size-82-36" /> */}
                    </Link>
                </div>


          </div>
      </div>
  )
};

export default LoginPage;