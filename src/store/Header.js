import React, { useState} from 'react';
import '../styles/store/Header.css';
import { NavLink } from 'react-router-dom';
import MiniCarrito from '../components/MiniCarrito';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Loading from '../components/Loading';

const Header = (props) => {

    const [ usuario, setUsuario ] = useState(props.usuario);
    const [loading, setLoading] = useState(false);

    const usuarioLogOut = () => {
        localStorage.clear();
        if(localStorage.getItem('admin') == null ) {
            window.location.href = "/";
        }
    }
    const searchProducts = (event) => {
        console.log(event.target.value)
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/search/';
        const data =  {
            "searchWord": event.target.value
        };
        axios.post(endpoint,JSON.stringify(data)).then((response) =>{
            setLoading(false);
            let responseData = response.data.data;
            if(responseData.length > 0 ) {
                props.setProducts(responseData)
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <div  className="headerStore-container">

            <div className="b-bar-logo">
            <div className="b-menu-link mobile pointer">
                    <i className="fas fa-bars pointer"></i>
                </div>
                <NavLink to="/">
                    <img src="/images/under-construction.svg" alt="logo"/>      
                </NavLink>
                
            </div>
            <div className="b-menu-link desktop pointer">
                    <i className="fas fa-bars pointer"></i>
                    <span>Categorias</span>
                </div>
            <div className="b-search" >
                <div className="b-input">
                <input onChange={searchProducts} name="searchWord" className="form-control" placeholder="Buscar en toda la tienda..."/>
                <i className="fas fa-search"></i>
                </div>  
            </div>
            <div className="b-account-minicart">
                    {
                        usuario != null && usuario
                        ?  <div className="b-account">
                            <div className="admin-data">
                            <span>{usuario.empresaRazonSocial}</span>
                                <Avatar src={usuario.urlImagen} ></Avatar>
                                <div className="mini-account">
                                    <span className="email">{usuario.correoEmpresarial}</span><br />
                                    <span  onClick={()=> usuarioLogOut()} className="btn-logout">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Cerrar Sesión</span>
                                    </span>
                                </div>
                            </div>            
                            </div>
                        : <NavLink to="/store/login">
                                <span className="user-name">Iniciar Sesión</span>
                                <i className="fas fa-user-circle"></i>
                                {/* <div className="mini-perfil">
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Cerrar Sesión</span>
                                </div> */}
                            </NavLink>
                    }
                    
                <a>
                    {/* <i className="fas fa-shopping-cart"></i>   */}
                <MiniCarrito carrito={props.carrito} /> 

                </a>
            </div>
        </div>
    );
}

export default Header;