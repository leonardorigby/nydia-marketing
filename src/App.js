import React, { useState, useEffect } from 'react';
import './App.css';
import Admin from './admin/';
import Proveedor from './proveedor/';
import Store from './store/';
import Login from './pages/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import RouteGuard from './route-guard';
import RouteGuardProveedor from './route-guard-proveedor';


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductsList from './components/ProductsList';
import axios from 'axios';
import Loading from './components/Loading';
import DesignButtons from './components/DesignButtons';

import { NavLink } from 'react-router-dom';

const App = () => {

  const [ carrito, setCarrito ] = useState(JSON.parse(localStorage.getItem('carrito')));
  const [ usuario, setUsuario ] = useState(JSON.parse(localStorage.getItem('usuario')));
  const [ products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState("Productos mas buscados");
  const [designStatus, setDesignStatus] = useState("column");

  useEffect(()=>{
    getProductos();
    console.log(designStatus);
  },[]);

  const getProductos = () => {
    const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto/';
      axios.get(endpoint).then((response) => {
        setLoading(false);
        let responseData = response.data.data;
        console.log(responseData)
        if(responseData.length > 0 ) {
            setProducts(responseData)
            setSearchMessage("Productos mas buscados");
        }
    }).catch((error) => {
        console.log(error);
        setLoading(false);
    })
  }


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

  // const searchProducts = (event) => {
  //   event.preventDefault();
  //   window.location.href = "/store/productos/" + event.target.searchWord.value;
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
// }

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
            setSearchMessage("Resultados");
        }else {
          setSearchMessage("Sin resultados...");
          setProducts([])
        }
    }).catch((error) => {
        console.log(error);
        setLoading(false);
    })
    }else {
      setProducts([]);
    }
}

  const changeDesignItems = (design) => {
    
    setDesignStatus(design);
    console.log(designStatus)
  }

  return (
    
    <div className="app-container">
      <Loading loading={loading}/>
      <BrowserRouter>


        {
          // window.location.pathname == '/' && <Redirect to="/store/" />
        }
          <Route exact path="/">
      <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={12} className="b-linkLogin">
            <a href="/login" >Iniciar Sesión <i class="fas fa-user"></i></a>
          </Grid>
          <Grid item xs={12} className="b-companyName">
            <img src="/brick-logo.png" alt="logo" className="logo"/>
            {/* <h1>Comerzializadora de materiales</h1> */}
          </Grid>
          <Grid item xs={12} className="main-search">

            <div className="b-main-search">
              <div className="">
                <h2 className="title">Buscar ofertas de produtos</h2>
              </div>
              <form>
                <div className="b-input">
                  <input onChange={search} name="searchWord" id="input-mainSearch" placeholder="Busca productos en toda la tienda... "/>
                  <i className="fas fa-search"></i>
                </div>
                <div className="b-btn">
                  <NavLink to="/store/productos">
                    <button id="btn-mainSearch" type="submit">Ver Productos</button>
                  </NavLink>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <h2 className="search-message">{searchMessage}</h2>
        </Grid>
        <Grid item xs={6} className="b-designItems">
          <DesignButtons designStatus={designStatus} changeDesignItems={(design) => setDesignStatus(design)} />
        </Grid>
      </Grid>

        {
          products.length > 0 &&
          <Grid item xs={12} className="productos">
          <div>
            <hr />
          </div>
            <ProductsList agregarProductoAlCarrito={agregarProductoAlCarrito} products={products} design={designStatus}/>
          </Grid>

        }
      </Container>
      
      </Route>

          <Route  path="/store/"><Store /></Route>

          <RouteGuard path="/admin/" component={Admin}  />
          <RouteGuardProveedor path="/proveedor/" component={Proveedor}  />

          <Route  path="/login/"><Login /></Route>

          {/* <Route  path="/login/proveedor-login"><LoginProveedor /></Route> */}
          
      </BrowserRouter>
    </div>
  );
}

export default App;
