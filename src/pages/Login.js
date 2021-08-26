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
  const showInputs = () =>{

  }
 
  const usuarioLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    var endpoint = "";
    var admin=false;
    var usuario=false;
    var proveedor=false;
    if(event.target.type.value=="administrador"){
      endpoint = '';//admin
      admin=true;
    }else if(event.target.type.value=="cliente"){
      endpoint = '';//usario
      usuario=true;
    }else if(event.target.type.value=="proveedor"){
      endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/proveedor/login';//provedor
      proveedor=true;
    }

    const credenciales = {
      'correoElectronico': event.target.correoElectronico.value,
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
        window.location.href = "/admin/";
      }else if(proveedor==true){
        localStorage.setItem('proveedor', JSON.stringify(response.data.data));
        window.location.href = "/proveedor/";
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
  const usuarioRegister = (event) => {
    event.preventDefault();
    setLoading(true);
    var endpoint = "";
    var admin=false;
    var usuario=false;
    var proveedor=false;
   if(event.target.password.value==event.target.passwordConfirmacion.value){

    if(event.target.type.value=="administrador"){
      endpoint = '';//admin
      admin=true;
    }else if(event.target.type.value=="cliente"){
      endpoint = '';//usario
      usuario=true;
    }else if(event.target.type.value=="proveedor"){
      endpoint = 'https://backendbrick.cuartelvr.com/materiales/v1/api/proveedor';//provedor
      proveedor=true;
    }

    const credenciales = {
      "razonSocial":event.target.razonSocial.value,
      "correoElectronico":event.target.correoElectronico.value,
      "password":event.target.password.value,
      "urlImagen":event.target.urlImagen.value,
      "cargoEmpresarial":event.target.cargo.value,
      "telefono": event.target.telefono.value,
      "rfc": event.target.rfc.value,
      "giroEmpresa": event.target.giroEmpresa.value,
      "promedioVentasMes": event.target.promedioVentasMes.value,
      "direccionSucursal": event.target.direccionSucursal.value
   }
   console.log(credenciales);
   console.log(endpoint);
   console.log(proveedor);

   axios.post(endpoint, JSON.stringify(credenciales)).then((response) => {
    console.log(response);
    setLoading(false);

    if(response.status == 201 && response.statusText === 'Created') {
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

  })
}else{
  alert("Las contraceñas No coinciden")
}

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
      <input type="email" name="correoElectronico" required/>
    </label>
    <label>
    <span>Soy :</span>
    <select name="type" id="type" required>
  <option value="" disabled selected >Seleccione un Rol</option>
  <option value="proveedor">Proveedor</option>
  <option value="cliente" >Cliente</option>
  <option value="administrador">Administrador</option>
</select>
    </label>
    <label>
      <span>Contraseña</span>
      <input type="password" name="password" required/>
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
      <div id="firstCol">
      <span>Soy : *</span>
          <select name="type" id="type" required onChange={showInputs}>
          <option value="" disabled selected >Seleccione un Rol</option>
          <option value="proveedor">Proveedor</option>
          <option value="cliente" >Cliente</option>
          <option value="administrador">Administrador</option>
        </select>

        <span>Razon Social</span>
        <input type="text" name="razonSocial"  required/>

          <span>RFC</span>
        <input type="text"  name="rfc"required/>
      
        <span>No Teléfono</span>
        <input type="text"  name="telefono"required/>
    
        <span>Correo electronico</span>
        <input type="email"  name="correoElectronico"required/>
      
        <span>Cargo en la empresa</span>
        <input type="text"  name="cargo"required/>
      
        <span>Contraseña</span>
        <input type="password"  name="password"required/>

        <span>Confirmación de Contraseña</span>
        <input type="password"  name="passwordConfirmacion"required/>

      </div>
      <div id="secondCol">
        <span>Imagen de Perfil</span>
        <input type="file" name="urlImagen"  required/>

        <span>Giro Empresarial</span>
        <input type="text"  name="giroEmpresa" required/>
      
        <span>Promedio de Ventas / Contrucciónes por Mes</span>
        <input type="text"  name="promedioVentasMes" required/>
    
        <span>Dirección de la Sucursal / de Entrega </span>
        <input type="text"  name="direccionSucursal" required/>
      

        <button type="submit" class="submit">Registrarse</button>

     
      </div>

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