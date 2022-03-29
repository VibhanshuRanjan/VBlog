import React,{ useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from "../../helper/authContext";
import style from './Navbar.module.scss'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userstate, setUserstate } = useContext(AuthContext);
//   const publish=false;
  const handleLogout = () => {
    localStorage.clear();
    setUserstate(false);
  };
  return (
    <div className={style.navbar}>
        <div className={style.nav_left}>
            <Link to='/'>
                <img src='/images/vblog.png' className={style.nav_logo} alt='blog-logo' />
            </Link>
        </div>
        <ul className = {style.nav_center} >
            <Link className={style.nav_center_options} to='/'>
                    HOME
            </Link>
            <Link className={style.nav_center_options} to='/allBlog'>
                    ALL BLOGS
            </Link>
            
            <Link className={style.nav_center_options} to='/publish'>
                    WRITE
            </Link>
            
            {
                userstate && (
                    <li className={style.nav_center_options}  onClick={handleLogout}>
                        LOGOUT
                    </li>
                )
            }
            
        </ul>
        <div className={style.nav_right}>
            {
                userstate?(
                    <Avatar src='/images/p1.jpeg'/>
                ):
                (
                    <button className={style.nav_btn}>
                        <Link className="link" to='/login'>
                            SIGN IN
                        </Link>
                    </button>
    
                )
            }
            
            
        </div>
    </div>
  )
}

export default Navbar