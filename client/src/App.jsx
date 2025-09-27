import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import AuthChecker from './pages/authChecker';
import Dashbord from './pages/dashboard';
import CodeEditor from './pages/codeEditor';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashbord />} /> 
            <Route path='/codeeditor/:stack' element={<CodeEditor/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
