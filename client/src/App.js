import './App.css';
import BlogPage from './pages/blogPage/BlogPage';
import React, {useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import PublishPage from './pages/publishPage/PublishPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import LoginPage from './pages/loginPage/LoginPage';
import { createContext } from 'react';
import axios from "axios"
import { AuthContext } from "./helper/authContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AllBlogPage from './pages/allBlogPage/AllBlogPage';

function App() {
  // const user = true;
  const [userstate, setUserstate]= useState();
  const user = localStorage.getItem("user");
  const [allBlogState,setAllBlogState]= useState(false);
  console.log(user);
  useEffect(()=>{
    if(user)
      setUserstate(true);
    else 
      setUserstate(false);
    
  },[userstate]);
  return (
    <div className='App'>
      <AuthContext.Provider value={{userstate,setUserstate}}>
      <Router>
      <Routes>
        <Route path = '/' element= {<HomePage/>} />
        <Route path = '/publish' element= {user?<PublishPage/>:<LoginPage/>} />
        <Route path = '/login' element= {user?<HomePage/>:<LoginPage/>} />
        <Route path = '/register' element= {user?<HomePage/>:<RegisterPage/>} />
        <Route path = '/blog/:id' element= {<BlogPage/>} />
        <Route path = '/allBlog' element={<AllBlogPage/>} /> 
      </Routes>
    </Router>
    </AuthContext.Provider>
    </div>
    
  );
}

export default App;
