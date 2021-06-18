import React, { useState, useEffect } from 'react';
import '../styles/admin/Sidebar.css';
import { Link, NavLink } from "react-router-dom";
import SideBarField from "../components/SideBarField";

const SideBar = (props) =>  {


        return (
            <div  className={"sidebar " + (props.sidebarOpen ? 'open' : '' )}>

              <SideBarField name="Home" icon="home" link="/admin/" exact="true"/>
              <hr/>
              <SideBarField name="Clientes" icon="users" link="/admin/clientes" exact="false"/>
              <SideBarField name="Proveedores" icon="people-arrows" link="/admin/proveedores" exact="false"/>
              <SideBarField name="Usuarios" icon="users-cog" link="/admin/usuarios" exact="false"/>
              <hr/>
              <SideBarField name="Productos" icon="list-ul" link="/admin/productos" exact="false"/>
              <SideBarField name="Categorias" icon="list-alt" link="/admin/categorias" exact="false"/>
              <SideBarField name="Sucursales" icon="warehouse" link="/admin/sucursales" exact="false"/>
              <hr/>

              
            
              {/* <NavLink className="link" activeClassName="active" to="/admin/login">
                <div className="b-col">
                  <div className="b-link">
                    <div className="b-icon">
                    <i className="fas fa-sign-in-alt icon-menu"></i>
                    </div>
                    <span>Log In</span>
                  </div>
                </div>
              </NavLink> */}
              {/* <NavLink exact className="link" onClick={logOut} to="/">
                <div className="b-col">
                  <div className="b-link">
                    <div className="b-icon">
                    <i className="fas fa-power-off icon-menu"></i>
                    </div>
                    <span>Log Out</span>
                  </div>
                </div>
              </NavLink>           */}
            </div>
        )
    }


export default SideBar;