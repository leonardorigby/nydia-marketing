import React, { useState, useEffect } from 'react';
import '../styles/store/Productos.css'
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';
import ItemShelf from '../components/ItemShelf';
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
        
      // searchProductos();

      getProductos();
    }, []);

    const getProductos = () => {
      const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/';
        axios.get(endpoint).then((response) => {
          setLoading(false);
          let responseData = response.data.data;
          console.log(responseData)
          if(responseData.length > 0 ) {
              setProductos(responseData)
          }else {
            
          }
      }).catch((error) => {
          console.log(error);
          setLoading(false);
      })
    }

    const filtrarProductos = (event) => {
      const searchWord = event.target.value;
      console.log(searchWord);
      const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/filter/';
      const data =  {
          "searchWord": searchWord
      };
        console.log("ahi")
        axios.post(endpoint,JSON.stringify(data)).then((response) => {
          console.log(response)
          setLoading(false);
          let responseData = response.data.data;
          console.log(responseData)
          if(responseData.length > 0 ) {
              setProductos(responseData)
          }else {
            
          }
      }).catch((error) => {
          console.log(error);
          setLoading(false);
      })
  }

    const searchProductos = () => {
      const searchWord = props.match.params.searchWord;
      console.log(searchWord);
      const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/search/';
      const data =  {
          "searchWord": searchWord
      };
        console.log("ahi")
        axios.post(endpoint,JSON.stringify(data)).then((response) => {
          console.log(response)
          setLoading(false);
          let responseData = response.data.data;
          console.log(responseData)
          if(responseData.length > 0 ) {
              setProductos(responseData)
          }else {
            
          }
      }).catch((error) => {
          console.log(error);
          setLoading(false);
      })
  }
    // const getProductos = () => {
    //     setLoading(true);
    //     const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/';

    //     axios.get(endpoint).then((response) =>{
    //         setLoading(false);
    //         let responseData = response.data.data;
    //         console.log(responseData);

    //         setProductos(
    //             responseData
    //         );
        
    //     }).catch((error) => {
    //         console.log(error);
    //         setLoading(false);
    //     })
    // }

    const productosLista = productos.map((producto, index) => 
        <Grid item xs={12} sm={6} md={3} key={index}>
          {/* {producto.id} */}
            <ItemShelf agregarProductoAlCarrito={props.agregarProductoAlCarrito} producto={producto}/>
        </Grid>
    );

    return (
        <div className="productos-container">
            <Loading loading={loading}/>
            <Container maxWidth="lg">
        <div className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={3} >
            <h3>Filtros</h3>
              <Paper className="box-filtros">
                <div className="filter-option">
                <input type="radio" name="site_name" 
                  value="1" 
                  // checked={filtrarProductos} 
                  onChange={filtrarProductos} />
                  <span>Pétreos</span>
                </div>

                <div className="filter-option">
                <input type="radio" name="site_name" 
                  value="2" 
                  // checked={filtrarProductos} 
                  onChange={filtrarProductos} />
                  <span>Cerámicos Y Vidrios</span>
                </div>

                <div className="filter-option">
                <input type="radio" name="site_name" 
                  value="3" 
                  // checked={filtrarProductos} 
                  onChange={filtrarProductos} />
                  <span>Metálicos</span>
                </div>

                <div className="filter-option">
                <input type="radio" name="site_name" 
                  value="4" 
                  // checked={filtrarProductos} 
                  onChange={filtrarProductos} />
                  <span>Plásticos</span>
                </div>

              </Paper>
          </Grid>
        <Grid item xs={12} sm={9} md={9} >
        <Grid container spacing={3}>
        {productosLista}

        </Grid>
        </Grid>
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