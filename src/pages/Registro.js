import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import axios from 'axios';



// import '../styles/store/Registro.css';


export default function Registro() {

  const [loading, setLoading] = useState(false);


  const usuarioLogin = (event) => {
    event.preventDefault();
    setLoading(true);


    const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/cliente/login';

    const credenciales = {
      'correoEmpresarial': event.target.correoElectronico.value,
      'password': event.target.password.value
    };

    axios.post(endpoint, JSON.stringify(credenciales)).then((response) => {
      console.log(response);
      setLoading(false);

      if(response.status == 200 && response.data.message === 'success') {
        localStorage.setItem('usuario', JSON.stringify(response.data.data));
        window.location.href = "/store/productos";
      }else {
        alert("Datos de sesión invalidos!!!")
      }

    }).catch((error)=> {
      setLoading(false);
      alert("Datos de sesión invalidos!!!")
      console.log(error.status);
    })

  }

  return (
    <div className="login-container">
      
    </div>
  );
}