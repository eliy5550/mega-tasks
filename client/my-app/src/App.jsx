import logo from './logo.svg';


import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import React, { createContext, useState } from 'react';
import Nav from './components/Nav';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


export const UserContext = createContext()

function App() {

  //guest user for a first time user
  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({"uid":13,"time_of_joining":"2023-08-16","email":"eliy5550@gmail.com","u_password":"123456","firstname":"USER","lastname":"1","u_role":"user"})


  return (
    <div className='container'>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"/>

      
            <UserContext.Provider value={[jwt, setJwt, user, setUser]}>
              <BrowserRouter>
                <Nav />
                <Routes>
                  <Route index path='/' element={<Home />}></Route>
                  <Route path='/home' element={<Home />}></Route>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                  <Route path='/dashboard' element={<Dashboard />}></Route>
                </Routes>
              </BrowserRouter>
            </UserContext.Provider>
          </div>
          );
}

          export default App;
