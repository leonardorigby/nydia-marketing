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
import Loading from '../components/Loading';import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import '../styles/components/AgregarProducto.css';

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
    categoria: ""
  }); 

const AgregarProducto = () => {

    const classes = useStyles();

    const [ imagenAvatar, setImagenAvatar ] = useState(null);

    const [producto, setProducto ] = useState(initialFormData);

    useEffect(()=>{
        // getCategorias();
    },[])

    // const getCategorias = () => {
    //     axios.get()
    // }

    const handleChange = (e) => {
        setProducto({
          ...producto,
            [e.target.name]: e.target.value.trim()
        });
      
      };

    const handleImageChange = (event) => {
        event.preventDefault();
        if([event.target.name] == 'urlImagen'){
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
       }

    //    const guardarImagen = async (fileImage) => {
    //     let formData = new FormData();
    //     const endpointImage = "https://backendbrick.cuartelvr.com/materiales/v1/api/producto";
    //           formData.append("folder", folder);
    //           formData.append("image", imagen);
    //           axios.post(endpointImage, formData, {
    //               headers: {
    //                   'Content-Type': 'multipart/form-data'
    //               }
    //           }).then(function(response){
    //               console.log(response);
    //               setLoading(false);
    //               if(response.data.success == true ){
    //                   data[fieldImage] = response.data.path;
    //                   registrarItem(data);
    //               }else {
  
    //                 alert("Error al guardar imgen folder no existe!");
    //               }
    //           }).catch(function(error){
    //             setLoading(false);
    //               console.log("error saving image => " + error)
    //           });
    //    }

       const guardarProducto = async (event) => {
            event.preventDefault();
            const endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/producto';
            const proveedor = JSON.parse(localStorage.getItem('proveedor'));
            // "nombre": "Martillo T",
            // "precio": 300.00,
            // "cantidad": 10,
            // "urlImagenPrincipal": "",
            // "totalImages": 1,
            // "proveedorId": "98",
            // "categoriaId": "98"
            const data = {
            "nombre": producto.nombre,
            "precio": producto.precio,
            "cantidad": producto.cantidad,
            "urlImagenPrincipal": "",
            "totalImages": 0,
            "proveedorId": proveedor.id,
            "categoriaId": producto.categoria
            };
            axios.post(endpoint, JSON.stringify(data), {"headers":{'Content-Type': 'application/json'}}).then((response)=>{
                console.log(response)
                if(response.status == 201) {
                    window.location.href = '/proveedor/productos';
                }
            }).catch((error)=>{
                console.log(error)
            });
            // const fileImage = event.target.fileImage.files[0];
            // const imagenResponse = await guardarImagen(fileImage);
            // console.log(imagenResponse);

       }
    return(
        <div className="addProduct-container">
            <h3>Agregar producto</h3>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} sm={12} md={4} >
                {
                    imagenAvatar != null
                    &&<Card className={classes.root}>
                            <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={imagenAvatar} 
                                title="Contemplative Reptile"
                            />
                            
                            </CardActionArea>
                        </Card>
                }
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={12} >
            <form  className="formulario" onSubmit={guardarProducto}>
                <Grid container spacing={2}>
                
                  <Grid item xs={12} sm={12} md={12} >
                    <div className="box-input">
                      <label>Nombre</label><br />
                      <input type="text" className="form-input" placeholder="" onChange={handleChange} name="nombre"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Precio</label><br />
                      <input type="number" className="form-input" placeholder="" onChange={handleChange} name="precio"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Cantidad</label><br />
                      <input type="number" className="form-input" placeholder="" onChange={handleChange} name="cantidad"  required />
                    </div>
                  </Grid>
                  {/* <Grid item xs={6} sm={6} md={6} >
                    <div className="box-input">
                      <label>Imagen</label><br />
                      <input type="file" className="form-input" placeholder="" name="fileImage" onChange={handleImageChange}  required />
                    </div>
                  </Grid> */}
                  
                  <Grid item xs={12} sm={12} md={6} >
                    <div className="box-input">
                      <label>Categoria</label><br />
                      <input type="text" className="form-input" placeholder="" onChange={handleChange} name="categoria"  required />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="box-btn">
                    <button type="submit" className="submit-btn">Crear producto</button>
                  </Grid>
                </Grid>
                </form>
                    </Grid>
                </Grid>
            </Container>            
        </div>
    );
}

export default AgregarProducto;