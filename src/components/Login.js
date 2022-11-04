import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";


 function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    } 
    if (user) navigate("/UploadFile");
  }, [user, loading]);

  function abrirApp(){
  navigate("/UploadFile")
}
  return (
    <>
<div className='card text-center m-5 ' style={{width: '75%'}}>
    <div className='card-body'>
    <h3 className='card-title text-dark '>Login</h3>
      <form >
      <div className="form-group">
        <label  >Email</label>
        <input className="form-control text-center" value={email} onChange={(e) => setEmail(e.target.value)}  id='email' name="email" placeholder="Email" type="email" />
        </div>
        <div className="form-group">
          <label >Senha</label>
        <input className="form-control text-center" aria-describedby='password'value={password} onChange={(e) => setPassword(e.target.value)}  id='password' name="password" placeholder="Senha" type="password" />
        <small className="form-text text-muted" id='password'>A senha deve conter 6 caracteres</small>
        </div>
        <button className='btn btn-outline-primary mb-2'  onClick={abrirApp} >Login</button>
      </form>
        <div>
          Ainda não tem conta? <Link to="/Cadastro">Cadastre-se</Link> agora.
        </div>
      </div>
      </div>



    </>
  )
}

export default Login;

