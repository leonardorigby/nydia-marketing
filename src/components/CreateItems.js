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
import '../styles/components/CreateItems.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: '90px',
    height: '90px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateItems = (props) => {

    const [proveedor, setProveedor] = useState(JSON.parse(localStorage.getItem('proveedor')));
    const [loading, setLoading] = useState(false);

    const [ imagenAvatar, setImagenAvatar ] = useState(null);
    const [ redirect, setRedirect ] = useState(false);
    
    useEffect(()=>{
        console.log(props.data);
    },[])

  const classes = useStyles();

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

  const checkItemData = (event) => {
    event.preventDefault();
    let tieneImagen = true;

    var data = {};
    props.data.fields.forEach(field => {
        data[field.name] = event.target[field.name].value
    });
    console.log(data);
    let keysArray = Object.keys(data);
    console.log(keysArray)


    for (let i = 0; i < keysArray.length; i++) {
        if(keysArray[i] == 'urlImagen' ) {
            tieneImagen = true;
            registrarItemConImagen(event,keysArray[i], data);
            break;
        }else {
            tieneImagen = false;
        }
    }

    if(tieneImagen === false) {
        registrarItem(data);
    }

    // for(let i = 0; i < fieldsArray.length; i++) {
    //     if(data[field.name] == 'urlImagen'){

    //         let folder = props.data.name;
    //         let imagen = event.target[field.name].value;
    //         data = {};
    //         let formData = new FormData();
    //         const endpoint = "https://webdevelopersgdl.com/comercializadora-material/api/save-image/";
    //         formData.append("folder", folder);
    //         formData.append("image", imagen);
    //         axios.post(endpoint, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }).then(function(response){
    //             console.log(response);
    //         }).catch(function(error){
    //             console.log("error saving image => " + error)
    //         });
    //         break;
    //     }else{
    //         data[field.name] = event.target[field.name].value
    //     }
    // }

    // const endpoint = props.data.endpoint;

    // const credenciales = {
    //   'correoElectronico': event.target.correoElectronico.value,
    //   'password': event.target.password.value
    // };

    // axios.post(endpoint, JSON.stringify(credenciales)).then((response) => {
    //   console.log(response);
    //   if(response.status == 200 && response.data.message === 'success') {
    //     localStorage.setItem('admin', JSON.stringify(response.data.data));
    //     window.location.href = "/admin";
    //   }

    // }).catch((error)=> {
    //   console.log(error.status);
    // })

    }
    const registrarItemConImagen = (event,fieldImage, data) => {
      if(props.data.tabla == "productos") {
        if(proveedor != null ) {
          console.log(data);
          setLoading(true);
          let folder = props.data.name;
              let imagen = event.target[fieldImage].files[0];
  
              let formData = new FormData();
              const endpointImage = "https://webdevelopersgdl.com/comercializadora-material/v1/api/save-image/";
              formData.append("folder", folder);
              formData.append("image", imagen);
              axios.post(endpointImage, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }).then(function(response){
                  console.log(response);
                  setLoading(false);
                  if(response.data.success == true ){
                      data[fieldImage] = response.data.path;
                      registrarItem(data);
                  }else {
  
                    alert("Error al guardar imgen folder no existe!");
                  }
              }).catch(function(error){
                setLoading(false);
                  console.log("error saving image => " + error)
              });
            } else {
              alert("Por favor de inciar sesión como proveedor!");
            }
      }else {
          console.log(data);
          setLoading(true);
          let folder = props.data.name;
              let imagen = event.target[fieldImage].files[0];
  
              let formData = new FormData();
              const endpointImage = "https://webdevelopersgdl.com/comercializadora-material/v1/api/save-image/";
              formData.append("folder", folder);
              formData.append("image", imagen);
              axios.post(endpointImage, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              }).then(function(response){
                  console.log(response);
                  setLoading(false);
                  if(response.data.success == true ){
                      data[fieldImage] = response.data.path;
                      registrarItem(data);
                  }else {
  
                    alert("Error al guardar imgen folder no existe!");
                  }
              }).catch(function(error){
                setLoading(false);
                  console.log("error saving image => " + error)
              });
      }
    }

    const registrarItem = (data) => {
      // console.log(data)
      //   data['precio'] = parseFloat(data.precio);
      if(props.data.tabla == 'productos') {
        data['proveedorId'] = proveedor.id;
      }
      console.log(data);
      //data.push({"totalImages":1});
        const endpoint = props.data.endpoint;
        console.log(props.data)
        axios.post(endpoint, JSON.stringify(data)).then((response) => {
        console.log(response);
        setLoading(false);
        if(response.status == 201) {
            alert(props.data.name + " creado con exito!")
            setRedirect(true);
        }

        }).catch((error)=> {
        console.log(error);
        })
    }


  

    const inputFields = props.data.fields.map((field, index) => 
         <Grid item xs={field.xs} sm={field.sm} key={index}>
           <label>{field.title}</label>
              <TextField
              autoComplete="fname"
              name={field.name}
              type={field.type}
              variant="outlined"
              required
              fullWidth
              id={field.name}
              autoFocus
              onChange={handleImageChange}
              />
          </Grid>  
    );
  return (
    <div className="createItems-container">
                  <Loading loading={loading}/>

        {
            redirect && <Redirect to={props.data.redirect} />
        }
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          {
            imagenAvatar != null
            ?<Avatar className={classes.avatar} src={imagenAvatar} ></Avatar>
            :<Avatar className={classes.avatar} src={imagenAvatar} ></Avatar>
          }
        <Typography component="h1" variant="h5">
          {props.data.name}
        </Typography>
        <form className={classes.form} onSubmit={checkItemData}>
          <Grid container spacing={2}>
            {inputFields}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
    </div>
  );
}

export default CreateItems;
