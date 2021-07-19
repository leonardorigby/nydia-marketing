import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/store/Producto.css';

import CarruselItems from '../components/CarruselItems';
import { useHistory, useParams } from "react-router-dom";


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

const Producto = (props) => {


    const [loading, setLoading] = useState(false);
    const [ producto, setProducto ] = useState(null);
    const [ items, setItems ] = useState([]);

    const history = useHistory()


    const classes = useStyles();

    useEffect(() => {
        // console.log(props.name);
        getProducto();
        getProductsRelated();
            return history.listen((location) => {
                console.log(`You changed the page to: ${location.pathname}`);
                window.location.reload(); 
            })
        },[history]);

    const getProductsRelated = () => {
        setLoading(true);
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/';

        axios.get(endpoint).then((response) => {
            setLoading(false);
            let responseData = response.data.data;
            console.log(responseData);

            setItems(
                responseData
            );
        
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const getProducto = () => {

        setLoading(true);
        const productoId = props.match.params.id;
        console.log(productoId)
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/' + productoId;

        axios.get(endpoint).then((response) =>{
            console.log(response);
            setLoading(false);
            let responseData = response.data;
            console.log(responseData);

            setProducto(
                responseData
            );
        
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    function componentWillReceiveProps(nextProps){
        //call your api and update state with new props
        console.log(nextProps);
     }

    return (
        <div className={(classes.root) + " producto-container"}>
            <Loading loading={loading}/>
            {
                producto != null && 
            <Container maxWidth="xl">
                <Grid container spacing={3}>
          <Grid item xs={6}>
              <div className="b-image">
                <img src={producto.urlImagen} className="img"/>
              </div>
          </Grid>
          <Grid item xs={6}>
                <div className="b-info">
                    <div className="name field-text">
                        <h3>{producto.nombre}</h3>
                    </div>
                    <div className="precio field-text">
                        <span>$ {producto.precio}.00</span>
                    </div>
                    <div className="precio field-text">
                        <span>{producto.datosAdicionales}</span>
                    </div>
                    <div className="precio field-text">
                        <span>Cantidad: </span>
                    </div>
                    <div className="precio field-text">
                        <i className="fas fa-minus"></i>
                        <input placeholder="Cantidad"/>
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="b-btn">
                    <button size="small" color="primary" className="buy-btn" onClick={() => props.agregarProductoAlCarrito(producto)}>Agregar al carrito</button>
                    </div>
                </div>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h3>Descripción</h3>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h3>Ficha Tecnica</h3>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h3>Datos Adicionales</h3>
            </Paper>
          </Grid>
          <Grid item xs={12}>
                <h2>Productos Realcionados</h2>
          </Grid>
          <Grid item xs={12}>
              {
                  items.length > 0 &&
                  <CarruselItems items={items}/>

              }
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                <h2>Reviews y comentarios</h2>
            </Paper>
          </Grid>

        </Grid>  
        </Container>
                    }

        </div>
    );
}

export default Producto;