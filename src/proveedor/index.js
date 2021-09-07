import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './Header';
import SideBar from './SideBar';
import Home from './Home';
import Productos from './Productos';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';

import '../styles/proveedor/Proveedor.css'
import Account from './Account';



const Proveedor = () => {

    const [ registroData, setRegistroData ] = useState({});

    const [sidebarOpen, setToggleSidebar ] = useState(false);

    const [ proveedor, setproveedor ] = useState(JSON.parse(localStorage.getItem('proveedor')));

    useEffect(() =>{
        // console.log(proveedor)
        
    },[proveedor]);

    useEffect(() =>{
        // console.log(sidebarOpen)
        
    },[sidebarOpen]);

    const nuevoRegistro = (data) => {
        // console.log(data)
        setRegistroData(
            data
        );
    }



    return(
        <div className={"proveedor-container " + (sidebarOpen ? 'open' : '' )}>
            <Header proveedor={proveedor} toggleSidebar={() => setToggleSidebar(!sidebarOpen) }/>

            <SideBar sidebarOpen={sidebarOpen}/>
            <Route exact path="/proveedor"><Home /></Route>
            <Route exact path="/proveedor/cuenta"><Account /></Route>
            <Route  exact path="/proveedor/productos/"><Productos proveedor={proveedor} nuevoRegistro={nuevoRegistro}/></Route>
            <Route exact path="/proveedor/registrar/"><AgregarProducto  /></Route>
            <Route
            path="/proveedor/productos/:id"
            render={(props) => (
              <EditarProducto {...props}  />
            )}
          />

        </div>
    );
}

export default Proveedor;