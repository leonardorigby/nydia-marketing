import React, { useState, useEffect } from 'react';
import './App.css';
import Admin from './admin/';
import Proveedor from './proveedor/';
import Store from './store/';
import Login from './store/Login';
import Register from './store/Register';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BrowserRouter, Redirect} from "react-router-dom";
import RouteGuard from './route-guard';
import RouteGuardProveedor from './route-guard-proveedor';

import LoginAdmin from './pages/LoginAdmin';
import LoginProveedor from './pages/LoginProveedor';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductsList from './components/ProductsList';
import CreateItems from './components/CreateItems';
import axios from 'axios';
import Loading from './components/Loading';
import Header from './store/Header';



const App = () => {

  const [ carrito, setCarrito ] = useState(JSON.parse(localStorage.getItem('carrito')));
  const [ usuario, setUsuario ] = useState(JSON.parse(localStorage.getItem('usuario')));
  const [ products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(false);


  const agregarProductoAlCarrito = (producto) => {
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    let carritoItems = [];
    if( carritoStorage != null ) {

      carritoItems = JSON.parse(localStorage.getItem('carrito'));

      carritoItems.push(producto);

      localStorage.setItem('carrito', JSON.stringify(carritoItems));

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );

    }else {

      localStorage.setItem('carrito', JSON.stringify([producto]));

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );
    }

  };

  const searchProducts = (event) => {
    event.preventDefault();
    window.location.href = "/store/productos/" + event.target.searchWord.value;
    // alert(event.target.search.value);
    // const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/search/';
    // const data =  {
    //     "searchWord": event.target.value
    // };
    // axios.post(endpoint,JSON.stringify(data)).then((response) =>{
    //     setLoading(false);
    //     let responseData = response.data.data;
    //     if(responseData.length > 0 ) {
    //         props.setProducts(responseData)
    //     }
    // }).catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    // })
}

  const search = (event) => {
    console.log(event.target.value)
    const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/search/';
    const data =  {
        "searchWord": event.target.value
    };
    if(event.target.value != "" && event.target.value != null){
      console.log("ahi")
      axios.post(endpoint,JSON.stringify(data)).then((response) =>{
        setLoading(false);
        let responseData = response.data.data;
        console.log(responseData)
        if(responseData.length > 0 ) {
            setProducts(responseData)
        }
    }).catch((error) => {
        console.log(error);
        setLoading(false);
    })
    }else {
      setProducts([]);
    }
}

  return (
    
    <div className="app-container">
      <Loading loading={loading}/>
      <BrowserRouter>


        {
          // window.location.pathname == '/' && <Redirect to="/store/" />
        }
          <Route exact path="/">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} className="b-companyName">
            <img src="/images/under-construction.svg" alt="logo" className="logo"/>
            {/* <h1>Comerzializadora de materiales</h1> */}
          </Grid>
          <Grid item xs={12} className="main-search">

            <div className="b-main-search">
              <div className="">
                <h2 className="title">Buscar ofertas de produtos</h2>
              </div>
              <form onSubmit={searchProducts}>
                <div className="b-input">
                  <input onChange={search} name="searchWord" id="input-mainSearch" placeholder="Busca productos en toda la tienda... "/>
                  <i className="fas fa-search"></i>
                </div>
                <div className="b-btn">
                  <button id="btn-mainSearch" type="submit">Buscar</button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
      <Grid item xs={12} className="productos">
        {
          products.length > 0 && 
          <div>
            <h2>Resultados</h2>
            <hr />
          </div>
        }
        <ProductsList agregarProductoAlCarrito={agregarProductoAlCarrito} products={products}/>
        </Grid>
      </Container>
      
      </Route>

          <Route  path="/store/"><Store /></Route>

          <RouteGuard path="/admin/" component={Admin}  />
          <RouteGuardProveedor path="/proveedor/" component={Proveedor}  />

          <Route  path="/login/admin-login"><LoginAdmin /></Route>

          <Route  path="/login/proveedor-login"><LoginProveedor /></Route>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
