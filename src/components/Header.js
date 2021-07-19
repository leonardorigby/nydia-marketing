import React, { useState} from 'react';
import '../styles/store/Header.css';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const Header = (props) => {

    return (
        <div className="headerStore-container">
            <div className="b-bar-logo">
            <div className="b-menu-link mobile pointer">
                    <i className="fas fa-bars pointer"></i>
                </div>
                <NavLink to="/store/productos/">
                    <img src="/images/under-construction.svg" alt="logo"/>      
                </NavLink>
                
            </div>

            
        </div>
    );
}

export default Header;