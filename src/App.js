import './App.css';
import UploadFile from './components/UploadFile';
import Login from './components/Login';
import  Cadastro from './components/Cadastro';
import {AuthContextProvider, useAuthState } from './components/Firebase'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




function App() {

  return (
   
         
         <div className='bg-light d-flex flex-column  align-items-center p-5  ' >
    <Router>
        <Routes>
        
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route exact path="/UploadFile" element={<UploadFile />} />
          
        </Routes>
      </Router>
      </div>
  );
}

export default App;
