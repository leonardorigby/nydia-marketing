import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
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
import axios from 'axios';
import Loading from '../components/Loading';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import '../styles/components/EditarProducto.css';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: "100%",
    },
  });

  const initialFormData = Object.freeze({
    nombre: "",
    precio: "",
    cantidad: "",
    categoriaId: ""
  }); 

const AgregarProducto = (props) => {

    const classes = useStyles();

    const [ imagenAvatar, setImagenAvatar ] = useState(null);

    const [producto, setProducto ] = useState(initialFormData);

    const [totalImages, setTotalImages ] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        // getCategorias();
        const productoId = props.match.params.id;
        console.log(productoId)

        getProducto(productoId);
        // console.log(producto);
    },[])

    // const getCategorias = () => {
    //     axios.get()
    // }

    const getProducto = (productoId) => {
      setLoading(true);
        const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto/' + productoId;
        axios.get(endpoint).then((response)=>{
          setLoading(false);
            console.log(response)
            setProducto(response.data);
            setTotalImages(parseInt(response.data.totalImages))
        }).catch((error)=>{
          setLoading(false);
            console.log(error);
            
        })
    }

    const handleChange = (e) => {
        setProducto({
          ...producto,
            [e.target.name]: e.target.value.trim()
        });
      
      };

    const handleImageChange = (event) => {
        event.preventDefault();
            console.log(event.target.files[0]);
            if(event.target.files[0] != undefined){
                setImagenAvatar(
                    URL.createObjectURL(event.target.files[0])
                )
            }else{
                setImagenAvatar(
                    null
                )
            }
       }

       const guardarImagen = (event) => {
           event.preventDefault();
           setLoading(true);
        const fileImage = event.target.fileImage.files[0];

        let formData = new FormData();
        const endpointImage = "https://backendbrick.cuartelvr.com/materiales/v1/api/save-product-image";
              formData.append("productId", producto.id);
              formData.append("imageFile", fileImage);
              console.log(formData);
              axios.post(endpointImage, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }).then(function(response){
                  console.log(response);
                  if(response.data.success == true) {
                      actualizarProductoTotalImages(response.data.total);
                  }
                  
              }).catch(function(error){
                setLoading(false);
                  console.log(error)
              });
       }

       const actualizarProductoTotalImages = (totalImages) => {
            const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto/' + producto.id;
            const data = {
            "nombre": producto.nombre,
            "precio": producto.precio,
            "cantidad": producto.cantidad,
            "urlImagenPrincipal": 'https://backendbrick.cuartelvr.com/materiales/images/producto/'+ producto.id +'/1.png',
            "totalImages": totalImages,
            "proveedorId": producto.proveedorId,
            "categoriaId": producto.categoriaId
            };
            axios.put(endpoint, JSON.stringify(data), {"headers":{'Content-Type': 'application/json'}}).then((response)=>{
                console.log(response);
                window.location.reload();
                setLoading(false);
            }).catch((error)=>{
              setLoading(false);
                console.log(error)
            });
       }

       const actualizarProducto = (event) => {
           event.preventDefault();
           console.log(producto);

        const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto/' + producto.id;
        axios.put(endpoint, JSON.stringify(producto), {"headers":{'Content-Type': 'application/json'}}).then((response)=>{
            console.log(response)
            window.location.reload();
        }).catch((error)=>{
            console.log(error)
        });
   }

   const deleteProducto = () => {
    const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto/' + producto.id;
    axios.delete(endpoint, {"headers":{'Content-Type': 'application/json'}}).then((response)=>{
        console.log(response)
        if(response.status === 200) {
          window.location.href = '/proveedor/productos';
        }
    }).catch((error)=>{
        console.log(error)
    });
   }


    //    const imagenesList = producto.totalImages.map((number, index) => 
    //    <Grid item xs={6} sm={4} md={3} key={index}>
    //    <Card className={classes.root}>
    //      <CardActionArea>
    //          <img src={"https://backendbrick.cuartelvr.com/materiales/images/producto" + number + ".png"} alt="portada" className="portada"/>
    //      </CardActionArea>
    //    </Card>
    //  </Grid>
    //    );

    // let rows = [];
    // for (var i = 0; i < 10; i++) {
    //     rows.push("<p>hi</p>");
    // }
    return(
        <div className="editProduct-container">
          <Loading loading={loading}/>
            <h3>Agregar producto</h3>
            <Container maxWidth="md">
            <div className="box-delete">
                            <i className="fa fa-trash" onClick={deleteProducto}></i>
                        </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} className="formulario">
                    <form onSubmit={guardarImagen}>
                    <div className="box-input">
                      <label>Cargar imagen</label><br />
                      <input type="file" className="form-input" defaultValue={producto.nombre} name="fileImage" onChange={handleImageChange}  required />
                    </div>
                {
                    
                    imagenAvatar != null
                    &&
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                        <Card className={classes.root}>
                            <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={imagenAvatar} 
                                title="imagen de producto"
                            />
                            
                            </CardActionArea>
                        </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <button type="submit" className="addImage-btn">Agregar Imagen</button>
                        </Grid>
                        </Grid>
                        
                }
                </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} >
            <form  className="formulario" onSubmit={actualizarProducto}>
                <Grid container spacing={2}>
                
                  <Grid item xs={12} sm={12} md={12} >
                    <div className="box-input">
                      <label>Nombre</label><br />
                      <input type="text" className="form-input" defaultValue={producto.nombre} defaultValue={producto.nombre} onChange={handleChange} name="nombre"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Precio</label><br />
                      <input type="number" className="form-input" defaultValue={producto.precio} onChange={handleChange} name="precio"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Cantidad</label><br />
                      <input type="number" className="form-input" defaultValue={producto.cantidad} onChange={handleChange} name="cantidad"  required />
                    </div>
                  </Grid>
                  {/* <Grid item xs={6} sm={6} md={6} >
                    <div className="box-input">
                      <label>Imagen</label><br />
                      <input type="file" className="form-input" defaultValue={producto.nombre} name="fileImage" onChange={handleImageChange}  required />
                    </div>
                  </Grid> */}
                  
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Categoria</label><br />
                      <input type="text" className="form-input" defaultValue={producto.categoriaId} onChange={handleChange} name="categoriaId"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="box-btn">
                    <button type="submit" className="submit-btn">Actualizar producto</button>
                  </Grid>
                </Grid>
                </form>
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <h3>Imagenes de producto ({producto.totalImages})</h3>
                        
                    </Grid>
                    {
                        producto.totalImages > 0 && 
                        [...Array(totalImages)].map((x, i ) =>
                            <Grid item xs={6} sm={4} md={3} key={i}>    
                                <Card className={classes.root}>
                                  <CardActionArea>
                                      <img src={"https://backendbrick.cuartelvr.com/materiales/images/producto/" + producto.id + "/"+ (i + 1) + ".png"} alt="portada" className="portada"/>
                                  </CardActionArea>
                                </Card>
                              </Grid>
                          )
                    }
                </Grid>
            </Container>            
        </div>
    );
}

export default AgregarProducto;