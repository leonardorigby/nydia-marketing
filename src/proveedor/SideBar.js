import React, { useState, useEffect } from 'react';
import '../styles/admin/Sidebar.css';
import { Link, NavLink } from "react-router-dom";
import SideBarField from "../components/SideBarField";

const SideBar = (props) =>  {


        return (
            <div  className={"sidebar " + (props.sidebarOpen ? 'open' : '' )}>
              <SideBarField name="Mi Cuenta" icon="user-circle" link="/proveedor/cuenta" exact="true"/>
              <hr/>
              <SideBarField name="Home" icon="home" link="/proveedor/" exact="true"/>
              <hr/>

              <SideBarField name="Productos" icon="list-ul" link="/proveedor/productos" exact="false"/>
              <SideBarField name="Categorias" icon="list-alt" link="/proveedor/categorias" exact="false"/>
              <hr/>

              <SideBarField name="Sucursales" icon="warehouse" link="/proveedor/sucursales" exact="false"/>
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