import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { CloudIDE } from './pages/cloud-ide'

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
        <Route path='/dashboard/oauth-success' element={<CloudIDE/>}/>
      </Routes>
    </BrowserRouter>   
    </>
  )
}

export default App
