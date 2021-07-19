import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './Header';
import SideBar from './SideBar';
import Home from './Home';
import Proveedores from './Proveedores';
import Clientes from './Clientes';
import Usuarios from './Usuarios';
import Productos from './Productos';
import CreateItems from '../components/CreateItems';

import '../styles/admin/Admin.css'



const Admin = () => {

    const [ registroData, setRegistroData ] = useState({});

    const [sidebarOpen, setToggleSidebar ] = useState(false);

    const [ admin, setAdmin ] = useState(JSON.parse(localStorage.getItem('admin')));

    useEffect(() =>{
        // console.log(admin)
        
    },[admin]);

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
        <div className={"admin-container " + (sidebarOpen ? 'open' : '' )}>
            <Header admin={admin} toggleSidebar={() => setToggleSidebar(!sidebarOpen)} />

            <SideBar sidebarOpen={sidebarOpen}/>

            <Route  exact path="/admin/"><Home admin={admin}/></Route>
            <Route  exact path="/admin/proveedores/"><Proveedores admin={admin} nuevoRegistro={nuevoRegistro}/></Route>
            <Route  exact path="/admin/clientes/"><Clientes admin={admin} nuevoRegistro={nuevoRegistro}/></Route>
            <Route  exact path="/admin/usuarios/"><Usuarios admin={admin} nuevoRegistro={nuevoRegistro}/></Route>
            <Route  exact path="/admin/productos/"><Productos admin={admin} nuevoRegistro={nuevoRegistro}/></Route>
            <Route exact path="/admin/registrar/"><CreateItems data={registroData} /></Route>

        </div>
    );
}

export default Admin;