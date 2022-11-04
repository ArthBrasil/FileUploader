import React from 'react'

 function FiltroDeArquivos(props) {
 
 
   function onFilterValueChange(event){
    props.filterValueSelected(event.target.value)
   }
 
 
 
 
 
    return (
   <>
    <select className="form-control-sm" name='TiposDeArquivo' onChange={onFilterValueChange}>
        <option value='todos'>Todos</option>
        <option value='imagem'>Imagens</option>
        <option value='texto'>Textos</option>

    </select>
   </>
  )
}

export default FiltroDeArquivos;