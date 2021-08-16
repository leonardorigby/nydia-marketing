import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import '../styles/store/Login.scss';

export default function Login() {

  const [loading, setLoading] = useState(false);
 
  const effect = () => {
    
      document.querySelector('.cont').classList.toggle('s--signup');
   
  }
  const usuarioDocumentos= (event) => {
    event.preventDefault();
    setLoading(true);

  }
  const usuarioRegister= (event) => {
    event.preventDefault();
    setLoading(true);
  }
  const usuarioLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    var endpoint = "";
    var admin=false;
    var user=false;
    var proveedor=false;
    if(event.target.type.value=="administrador"){
      endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/usuario/login';//admin
      admin=true;
    }else if(event.target.type.value=="cliente"){
      endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/cliente/login';//usario
      user=true;
    }else if(event.target.type.value=="proveedor"){
      endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/proveedor/login';//provedor
      proveedor=true;
    }

    const credenciales = {
      'correoEmpresarial': event.target.correoElectronico.value,
      'password': event.target.password.value
    };

    axios.post(endpoint, JSON.stringify(credenciales)).then((response) => {
      console.log(response);
      setLoading(false);

      if(response.status == 200 && response.data.message === 'success') {
        if(usuario==true){
        localStorage.setItem('usuario', JSON.stringify(response.data.data));
        window.location.href = "/store/productos";
      }else if(admin==true){
        localStorage.setItem('admin', JSON.stringify(response.data.data));
        window.location.href = "/admin";
      }else if(proveedor==true){
        localStorage.setItem('proveedor', JSON.stringify(response.data.data));
        window.location.href = "/proveedor";
      }
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

      {/* Container */}
      <Container maxWidth="md">
        {/* Row */}
        <Grid container spacing={2}>
          {/* Cols*/}
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <div class="cont">
  <form class="form sign-in" onSubmit={usuarioLogin}>
    <h2>¡Bienvenido de Nuevo!</h2>
    <label>
      <span>Correo Electronico</span>
      <input type="email" name="correoElectronico" />
    </label>
    <label>
    <span>Soy :</span>
    <select name="type" id="type">
  <option value="" disabled selected >Seleccione un Rol</option>
  <option value="proveedor">Proveedor</option>
  <option value="cliente" >Cliente</option>
  <option value="administrador">Administrador</option>
</select>
    </label>
    <label>
      <span>Contraseña</span>
      <input type="password" name="password"/>
    </label>
    <p class="forgot-pass">¿Olvidaste tu Contraseña?</p>
    <button type="submit" class="submit">Iniciar Sesión</button>
  </form>
  <div class="sub-cont">
    <div class="image">
      <div class="image__text m--up">
        <h2>¿Eres nuevo aquí?</h2>
        <p>¡Regístrate y descubre una gran cantidad de nuevos productos!</p>
      </div>
      <div class="image__text m--in">
        <h2>¿Ya eres parte de BRICK?</h2>
        <p>Si ya tiene una cuenta, inicie sesión. ¡Lo extrañamos!</p>
      </div>
      <div class="image__btn" onClick={effect}>
        <span class="m--up">Registrarse</span>
        <span class="m--in">Iniciar Sesión</span>
      </div>
    </div>
    <form class="form sign-up" onSubmit={usuarioRegister}>
      <h2>¡Es hora de descubrir nuevos productos!</h2>
      <label>
        <span>Razon Social</span>
        <input type="text" />
          <span>RFC</span>
        <input type="text" />
      
        <span>No Teléfono</span>
        <input type="text" />
    
        <span>Correo electronico</span>
        <input type="email" />
      
        <span>Cargo en la empresa</span>
        <input type="text" />
      
        <span>Contraseña</span>
        <input type="password" />

        <span>Confirmación de Contraseña</span>
        <input type="password" />
      </label>
      <button type="button" class="files" data-toggle="modal" data-target="#modal-documentos">Documentación</button>
      <button type="submit" class="submit">Registrarse</button>
    </form>
  </div>
</div>
          </Grid>
          

        </Grid>
      </Container>

<div class="modal fade" id="modal-documentos" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  >Documentación / Información </h5>
      </div>
      <div class="modal-body">
        <form onSubmit={usuarioDocumentos}>
        <label>Soy : *</label>
        <select name="type" id="type" required>
        <option value="" disabled selected >Seleccione un Rol</option>
        <option value="proveedor">Proveedor</option>
        <option value="cliente" >Cliente</option>
        <option value="administrador">Administrador</option>
      </select>
        <label>Imagen de Perfil</label>
        <input type="file" />
        <label>Constancia de situacion fiscal *</label>
        <input type="file" required/>
        <label>Acta constitutiva *</label>
        <input type="file" required/>
        <label>Poderes*</label>
        <input type="file" required/>
        <label>Opinion de cumplimiento de obligaciones *</label>
        <input type="file" required/>
        <label>Comprobante de domicilio (no mayor a 3 meses) *</label>
        <input type="file" required/>
        <label> Identificacion oficial (INE o Pasaporte) *</label>
        <input type="file" required/>
        </form>
      </div>
      <label>Llenar los campos con * obligatoriamente</label>
      <div class="modal-footer">
        
        <button type="sumit" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Continuar</button>
      </div>
    </div>
  </div>
</div>
      {/* tu codigo */}

      {/* <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form}  onSubmit={usuarioLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="correoElectronico"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
                        <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
            <NavLink to="/store/registrar">
            {"¿No tienes cuenta? Regístrala ahora."}
                </NavLink>
                
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </ThemeProvider> */}
    </div>
  );
}