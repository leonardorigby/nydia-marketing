import React, {useState} from 'react';
import '../styles/proveedor/Header.css';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';


const Header = (props) => {

    const proveedorLogOut = () => {
        localStorage.clear();
        if(localStorage.getItem('proveedor') == null ) {
            window.location.href = "/proveedor-login";
        }
    }

    return (
        <div className="headerProveedor-container">
            <div className="b-bar-logo">
            <div className="b-menu-link pointer">
                    <i className="fas fa-bars menu-icon pointer" onClick={() => props.toggleSidebar() }></i>
                </div>
                <NavLink to="/proveedor">
                    <img src="/brick-logo.png" alt="logo"/>      
                </NavLink>
                {/* <div className="b-menu-link desktop pointer">
                    <i className="fas fa-bars pointer"></i>
                    <span>Categorias</span>
                </div> */}
            </div>
            <div className="b-account">
                <div className="proveedor-data">
                    <span>{props.proveedor.empresaRazonSocial}</span>
                    <Avatar src={props.proveedor.urlImagen} ></Avatar>
                    <div className="mini-account">
                        <span className="email">{props.proveedor.correoEmpresarial}</span><br />
                        <span  onClick={()=> proveedorLogOut()} className="btn-logout">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Cerrar Sesión</span>
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className="b-search">
                <div className="b-input">
                <input className="form-control" placeholder="Buscar en toda la tienda..."/>
                <i className="fas fa-search"></i>
                </div>  
            </div>
            <div className="b-account-minicart">
                <NavLink to="/store/login">
                    <span className="user-name">Leonardo Rigby</span>
                    <i className="fas fa-user-circle"></i>
                </NavLink>
                <a>
                    <i className="fas fa-shopping-cart"></i>  
                </a>
            </div> */}
        </div>
    );
}

export default Header;