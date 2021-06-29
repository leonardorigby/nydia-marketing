import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/components/Buscador.css';

import TableItems from './TableItems';
import axios from 'axios';
import Loading from './Loading';

const Buscador = (props) => {
  
  const search = (event) =>{
    event.preventDefault();
    let data = {
      searchWord: event.target.product.value,
    };
    const user =localStorage.getItem("admin");
   
    const headers = {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("admin")).jwt}`}

    const api =
      "https://webdevelopersgdl.com/comercializadora-material/v1/api/search/";
      console.log( data)
    axios.post(api, JSON.stringify(data), headers)
      .then(function (response) {
        console.log(response);
      
     });

  }
    return (
        <div className="buscador">
            <div className="container container-home">
        <div >
          <div className="row ">
            <div className="col-md-4 offset-6 input-text">
              <h1>Nombre Empresa</h1>
              <h4 className="slogan">¡Slogan de la Empresa!</h4>
            </div>
          </div>
          <form  onSubmit={search}>
          <div className="row ">
            <div className="col-md-8 offset-2 input">
              <input
                className="form-control"
                placeholder="¿ Qué deseas buscar ?"
                id="product"
                name="product"
                
              />
              <button
                className="fas fa-search search-home" 
                type="submit"
              ></button>
            </div>
          </div>
          </form>
        </div>
    
      </div>
        </div>
    );
}

export default Buscador;