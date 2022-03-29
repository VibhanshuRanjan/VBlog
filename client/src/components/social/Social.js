import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import style from './Social.module.scss'
import { color } from '@mui/system';



const Social = () => {
  return (
    <div className={style.social}>
        

                <div className={style.social_items}>
                    <div className={style.social_title}>
                        FOLLOW US ON
                    </div>
                    {/* <div className={style.social_lists}> */}
                    <a
                    target="_blank"
                    className={style.socialmedia_list}
                    // class=" btn-link btn-floating btn-lg text-blue ml-4"
                    href="https://www.facebook.com/vibhanshu.ranjan.3517"
                    role="button"
                    data-mdb-ripple-color="dark"
                    ><FacebookIcon className={style.facebook}/></a>
                    <a
                    target="_blank"
                    className={style.socialmedia_list}
                    // class=" btn-link btn-floating btn-lg text-blue ml-4"
                    href="https://twitter.com/imVibhanshu15"
                    role="button"
                    data-mdb-ripple-color="dark"
                    ><TwitterIcon className={style.twitter}/></a>
            
                    <a
                    target="_blank"
                    className={style.socialmedia_list}
                    // class=" btn-link btn-floating btn-lg text-danger ml-4"
                    href="https://www.instagram.com/vib_ranjan/"
                    role="button"
                    data-mdb-ripple-color="dark"
                    ><InstagramIcon className={style.instagram}/></a>
            
                    <a
                    target="_blank"
                    className={style.socialmedia_list}
                    // class=" btn-link btn-floating btn-lg text-blue ml-4"
                    href="https://in.linkedin.com/in/vibhanshu-ranjan-2668451b0"
                    role="button"
                    data-mdb-ripple-color="dark"
                    ><LinkedInIcon className = {style.linkedin} /></a>
                    
                    <a
                    target="_blank"
                    className={style.socialmedia_list}
                    // class=" btn-link btn-floating btn-lg text-dark ml-4"
                    href="https://github.com/VibhanshuRanjan"
                    role="button"
                    data-mdb-ripple-color="dark"
                    ><GitHubIcon className={style.github}/></a>
                    {/* </div> */}
                </div>
        
  </div>
  )
}

export default Social