import React from "react";
import { useState,useEffect } from "react";
import {storage} from './Firebase'
import {ref, uploadBytes, listAll,getDownloadURL,getMetadata} from 'firebase/storage'


import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import FiltroDeArquivos from "./FiltroDeArquivos";


function UploadFile ()  {


const [arquivoUpload,setArquivoUpload] = useState(null)
const [listaDeArquivos,setListaDeArquivos] = useState([])


  const [show, setShow] = useState(false);
  const [value, setValue] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [filterValue, setFilterValue] = useState('todos')
  
  const navigate = useNavigate();

const listaDeArquivosRef = ref(storage,'arquivos/')

{/* Upar arquivos e acessar a URL dos arquivos  */}

  const uploadArquivo = () => {
    if (arquivoUpload == null) return;
    const arquivoRef = ref(storage, `arquivos/${arquivoUpload.name}`);


    uploadBytes(arquivoRef, arquivoUpload).then((snapshot) => {
      alert('arquivo upado');
      getDownloadURL(snapshot.ref).then((url) => {
      
        setListaDeArquivos((prev) => [...prev, url])


      } ) 


    })
  }

 
  useEffect(() =>{
    listAll(listaDeArquivosRef).then((response) => {
      response.items.forEach((item) => {
      
       
    getMetadata(item).then((data) => {
      
          setValue(data);
          setShow(true);
          
          setValueList((prev) => [...prev,data])
          
          getDownloadURL(item).then((url) => {
            setListaDeArquivos((prev) => [...prev,url])
            
            data.url = url;
           
          } )
    } )
      })
    })
  },[arquivoUpload])

  function onFilterValueSelected(filterValue){
    setFilterValue(filterValue)
  }
  
  function Sair(){
    navigate("/")
  }
    
  return(
    <>
         <button className="btn btn-danger" onClick={Sair}>
          Logout
         </button>
       
 
 
    <div>
    <h3 className='card-title text-dark text-center'>Faça Upload do seu arquivo</h3>
 
    <FiltroDeArquivos filterValueSelected={onFilterValueSelected}/>
   <div>
    <label for="formFile" className="form-label">Selecione seu arquivo depois aperte no butão de Upload</label>
      <input className="form-control-file" id='formFile' type='file' onChange={(event) => {setArquivoUpload(event.target.files[0])}}/>
      <button className="btn btn-primary mt-4" onClick={uploadArquivo}>Upload Arquivo</button>
      </div>
      <div className="imagens">
      {valueList.map((data) => {
      return(
      <>  
      {
          show ?
            <div>
              <table class="table table mt-4 ">
              <thead>
    <tr>
      <th scope="col">Icone</th>
      <th scope="col">Nome</th>
      <th scope="col">Tamanho</th>
      <th scope="col">Tipo</th>
      <th scope="col">Data</th>
    </tr>
      </thead>
          <tbody>
        <tr>
        <th scope="row"> <img src={data.url}/></th>
        <td><a href={data.url}>{data.name}</a></td>
        <td><p>{data.size} </p></td>
        <td><p>{data.contentType} </p></td>
        <td><p>{new Date(data.timeCreated).toLocaleString()}</p></td>
        </tr>
          </tbody>
        
     </table>


              {/* Confirm 
              <img src={url}/>
              <a href={url}>Nome : {value.name}</a>
              <p>Tamanho  : {value.size} </p>
              <p>Tipo : {value.contentType}</p>
              <p>Data : {value.timeCreated}</p>
              */}
            </div>
            
            :
            <div></div>

            
        }
        
      </>)
       
    })}
    </div>
      </div>  
    </>
  )
}

export default UploadFile;