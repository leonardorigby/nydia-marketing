import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import ProductoShelf from '../components/ProductoShelf';
import Login from './Login';
import Header from './Header';
import Productos from './Productos';
import Buscador from '../components/Buscador';



const Store = () => {
    const [ carrito, setCarrito ] = useState(JSON.parse(localStorage.getItem('carrito')));

  useEffect(() => {
    console.log(carrito);
  },[carrito]);

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

    return(
        <div className="store-container">
            <Header carrito={carrito}/>
            
          

          <Route  path="/store/productos/"><Productos agregarProductoAlCarrito={agregarProductoAlCarrito}/></Route>
          <Route  path="/store/login/"><Login /></Route>
          <Route  path="/store/search/"><Buscador /></Route>
        </div>
    );
}
export default Store;