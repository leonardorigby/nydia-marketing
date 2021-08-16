import React, { useState } from 'react';
import '../styles/store/Footer.css';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Footer = () => {

    const classes = useStyles();
    return (
        <Container maxWidth="xl" className="footer-container">
            <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <div className="b-bar-logo">
                <NavLink to="/">
                    <img src="/brick-logo.png" alt="logo"/>      
                </NavLink>
            </div>
        </Grid>
        <Grid item xs={3}>
        <h6>¿Cómo podemos ayudarte?</h6>
            <hr />
            <NavLink to="/store/login">
                Soy Proveedor
            </NavLink>
            <br />
            <br />
            <NavLink to="/store/login">
                Admin
            </NavLink>
        </Grid>
        <Grid item xs={3}>
        <h6>Contáctanos</h6>
            <hr />
            <NavLink to="/store/error">
                hola@materiales.com
            </NavLink><br />
            <NavLink to="/store/error">
                333 333 3333
            </NavLink>
        </Grid>

        <Grid item xs={3}>
        <h6>Suscríbete</h6>
            <hr />
        </Grid>
        <Grid item xs={12}>
            <h5>Legales</h5>
            <hr />
            <Container maxWidth="md" >
            <Grid container spacing={3}>
            <Grid item xs={3}>
                <NavLink to="/store/error">
                    Términos y condiciones
                </NavLink>
            </Grid>
            <Grid item xs={3}>
                <NavLink to="/store/error">
                Aviso de privacidad
                </NavLink>
            </Grid>
            <Grid item xs={3}>
                <NavLink to="/store/error">
                Condiciones de promociones
                </NavLink>
            </Grid>
            <Grid item xs={3}>
                <NavLink to="/store/error">
                Condiciones de envíos
                </NavLink>
            </Grid>
            </Grid>
            </Container>
            
        </Grid>
        {/* <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid> */}
      </Grid>
      {/* <div className="b-bar-logo">
                
                <NavLink to="/store">
                    <img src="/brick-logo.png" alt="logo"/>      
                </NavLink>
            </div>
            <div className="b-bar-options">
                <h6>¿Cómo podemos ayudarte?</h6>
                
                <div>
                <NavLink to="/store/registro">
                    Soy Proveedor
                </NavLink>
                </div>
                <div>
                <NavLink to="/store/registro">
                    Ayuda
                </NavLink>
                </div>
                <div>
                <NavLink to="/store/registro">
                    Contactanos
                </NavLink>
                </div>
            </div> */}
    </div>
    </Container>
            
    );
}

export default Footer;