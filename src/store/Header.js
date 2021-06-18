import React from 'react';
import '../styles/store/Header.css';
import { NavLink } from 'react-router-dom';
import MiniCarrito from '../components/MiniCarrito';

const Header = (props) => {
    return (
        <div className="headerStore-container">
            <div className="b-bar-logo">
            <div className="b-menu-link mobile pointer">
                    <i className="fas fa-bars pointer"></i>
                </div>
                <NavLink to="/store">
                    <img src="/images/under-construction.svg" alt="logo"/>      
                </NavLink>
                <div className="b-menu-link desktop pointer">
                    <i className="fas fa-bars pointer"></i>
                    <span>Categorias</span>
                </div>
            </div>
            <div className="b-search">
                <div className="b-input">
                <input className="form-control" placeholder="Buscar en toda la tienda..."/>
                <i className="fas fa-search"></i>
                </div>  
            </div>
            <div className="b-account-minicart">
                <NavLink to="/store/login">
                    <span className="user-name">Leonardo Rigby</span>
                    <i className="fas fa-user-circle"></i>
                    {/* <div className="mini-perfil">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Cerrar Sesión</span>
                    </div> */}
                </NavLink>
                <a>
                    {/* <i className="fas fa-shopping-cart"></i>   */}
                <MiniCarrito carrito={props.carrito} /> 

                </a>
            </div>
        </div>
    );
}

export default Header;