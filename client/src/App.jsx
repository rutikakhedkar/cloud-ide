import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CloudIDE } from './pages/cloud-ide';
import { ToastContainer } from 'react-toastify';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import AuthChecker from './pages/authChecker';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthChecker />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard/oauth-success"
            element={ <CloudIDE /> }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
