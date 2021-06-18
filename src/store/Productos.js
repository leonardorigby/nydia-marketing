import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';
import ProductoShelf from '../components/ProductoShelf';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    media: {
      height: 140,
    },
    root: {
      flexGrow: 1,
    },    
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Productos = (props) => {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = () => {
        setLoading(true);
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/';

        axios.get(endpoint).then((response) =>{
            setLoading(false);
            let responseData = response.data.data;
            console.log(responseData);

            setProductos(
                responseData
            );
        
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const productosLista = productos.map((producto, index) => 
        <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductoShelf agregarProductoAlCarrito={props.agregarProductoAlCarrito} producto={producto}/>
        </Grid>
    );

    return (
        <div className="productos-container">
            <Loading loading={loading}/>
            <Container maxWidth="lg">
        <div className={classes.root}>
      <Grid container spacing={3}>
          {productosLista}
        {/* <Grid item xs={12} sm={6} md={3} >
            
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
    </Container>

            
        </div>
    );
}

export default Productos;