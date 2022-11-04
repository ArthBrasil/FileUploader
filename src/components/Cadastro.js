import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "./Firebase";



 const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
  const register = () => {
    if (!name) alert("Digite seu nome");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) Navigate("/UploadFile");
  }, [user, loading]);


  
  return (
    <>
     
    <div className='card text-center ' style={{width: '75%'}}>
    <div className='card-body'>
    <h3 className='card-title text-dark '>Cadastro</h3>
     
      <form >
      <div className="form-group">
      <label for='nome'>Nome</label>
      <input
          type="text"
          className="form-control text-center"
          id="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />


      </div>
      <div className="form-group">
      
        <label for='email' >Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control text-center"  id='email' name="email" placeholder="Email" type="email" />
        </div>
        <div className="form-group">
          <label  for='password'>Senha</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control text-center" aria-describedby='inputSenha' id='password' name="password" placeholder="Senha" type="password" />
        <small className="form-text text-muted" id='inputSenha'>A senha deve conter 6 caracteres</small>
        </div>
        <button className='btn btn-outline-primary mb-2' onClick={register} >Cadastre-se</button>
        
        <div>
          já tem uma conta? <Link to="/">Login</Link> 
        </div>
      </form>
      
      </div>
      </div>
    </>
  )
}

export default Cadastro;