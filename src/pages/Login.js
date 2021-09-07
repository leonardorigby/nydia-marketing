import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import '../styles/store/Login.scss';

export default function Login() {

  const [loading, setLoading] = useState(false);
 
  const effect = () => {
    
      document.querySelector('.cont').classList.toggle('s--signup');
      localStorage.clear();

  }
 
 
  const usuarioLogin = (event) => {
   // alert(event.target.type.name);

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
        
        axios.get("https://backendbrick.cuartelvr.com/materiales/v1/api/proveedor/"+response.data.data.id, { headers: {"Authorization" : `Bearer ${response.data.data.jwt}`} }).then((result) =>{
            localStorage.removeItem('proveedor');
            localStorage.setItem('proveedor', JSON.stringify(response.data));
        
            if(result.data.giroEmpresa!="sinDatos"){
              if(usuario==true){
                localStorage.setItem('usuario', JSON.stringify(result.data));
                window.location.href = "/store/productos";
              }else if(admin==true){
                localStorage.setItem('admin', JSON.stringify(result.data));
                window.location.href = "/admin/";
              }else if(proveedor==true){
                localStorage.setItem('proveedor', JSON.stringify(result.data));
                window.location.href = "/proveedor/";
              }
            }else{
              if(usuario==true){
                localStorage.setItem('usuario', JSON.stringify(result.data));
                window.location.href = "/store/complete-Registro";
              }else if(admin==true){
                localStorage.setItem('admin', JSON.stringify(result.data));
                window.location.href = "/store/complete-Registro";
              }else if(proveedor==true){
                localStorage.setItem('proveedor', JSON.stringify(result.data));
                window.location.href = "/store/complete-Registro";
              }   
            }
          }).catch(function(error){
            console.log("error get user => " + error)
           });
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
      "urlImagen":"sinDatosValidos"+event.target.rfc.value,
      "cargoEmpresarial":event.target.cargo.value,
      "telefono": event.target.telefono.value,
      "rfc": event.target.rfc.value,
      "giroEmpresa": "sinDatos",
      "promedioVentasMes": 0,
      "direccionSucursal": "sinDatos"
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
      window.location.href = "/login";
    }else if(admin==true){
      localStorage.setItem('admin', JSON.stringify(response.data.data));
      window.location.href = "/login";
    }else if(proveedor==true){
      localStorage.setItem('proveedor', JSON.stringify(response.data.data));
      window.location.href = "/login";
    }
    }else {
      alert("Datos de sesión invalidos!!!")
    }

  }).catch(function(error){
    console.log("error in login => " + error)
});

}else{alert("Las contraceñas No coinciden")}

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
          <select name="type" id="type" required >
          <option value="" disabled selected >Seleccione un Rol</option>
          <option value="proveedor">Proveedor</option>
          <option value="cliente" >Cliente</option>
        </select>

        <span>Razon Social</span>
        <input type="text" name="razonSocial"  required/>

        <span>RFC</span>
        <input type="text" name="rfc" required/>
      
        <span>No Teléfono</span>
        <input type="text"  name="telefono" required/>
    
        <span>Correo electronico</span>
        <input type="email"  name="correoElectronico" required/>
      
        <span>Cargo en la empresa</span>
        <input type="text"  name="cargo" required/>
      
        <span>Contraseña</span>
        <input type="password"  name="password" required/>

        <span>Confirmación de Contraseña</span>

        <input type="password"  name="passwordConfirmacion" required/>

        <button type="submit" class="submit">Registrarse</button>

      </div>
   

    </form>
  </div>
</div>
          </Grid>
          

        </Grid>
      </Container>

      {/* tu codigo */}


    </div>
  );
}