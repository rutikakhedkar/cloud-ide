import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import './App.css'
import  LoginPage  from './pages/login'
import SignupPage from './pages/signup'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>   
    </>
  )
}

export default App
