import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import '../styles/store/seguimientoRegistro.scss';



const SeguimientoRegistro = () => {
   // alert(event.target.type.name);
   const [loading, setLoading] = useState(false);
   
   useEffect(()=>{
   /* var usuario= JSON.parse(localStorage.getItem("proveedor"));
    axios.get("https://backendbrick.cuartelvr.com/materiales/v1/api/proveedor/"+usuario.id, { headers: {"Authorization" : `Bearer ${usuario.jwt}`} }).then((response) =>{
        localStorage.removeItem('proveedor');
        localStorage.setItem('proveedor', JSON.stringify(response.data));
     }).catch(function(error){
        console.log("error get user => " + error)
    });*/
  },[]);

    const usuarioDocuments = (event) => {
       var usuario= JSON.parse(localStorage.getItem("proveedor"));
        event.preventDefault();
        setLoading(true);
        var userLogin=[];
        /* block cargar imagen avatar*/ 
          let imagen = event.target.proveedor.files[0];
          let formData = new FormData();
          const endpointImage = "https://backendbrick.cuartelvr.com/materiales/v1/api/save-user-image";
          formData.append("userId", usuario.id);
          formData.append("folderName", "proveedor");
          formData.append("imageFile", imagen);
          axios.post(endpointImage, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }).then(function(response){
            console.log(response.data.path);
            /* block actualizar provedor*/ 

            const endpoinUpdateProveedor = "https://backendbrick.cuartelvr.com/materiales/v1/api/proveedor/"+usuario.id;
            const credencialesUpdate= {
             "razonSocial":usuario.razonSocial,
             "correoElectronico":usuario.correoElectronico,
             "urlImagen":response.data.path,
             "cargoEmpresarial":usuario.cargoEmpresarial,
             "telefono": usuario.telefono,
             "rfc": usuario.rfc,
             "giroEmpresa": event.target.giro.value,
             "promedioVentasMes": event.target.promedio_ventas.value,
             "direccionSucursal":event.target.direccion.value
   
         };

            console.log(credencialesUpdate)
            console.log(endpoinUpdateProveedor)
           
            axios.put(endpoinUpdateProveedor, JSON.stringify(credencialesUpdate)).then(function(result) {
             console.log(result);
             //setLoading(false);
             //localStorage.removeItem('proveedor');
             //localStorage.setItem('proveedor', JSON.stringify(result.data));
   
           //window.location.href = "/proveedor/";
          
           });

              
          }).catch(function(error){
              console.log("error saving document => " + error)
          });
         
         /*End block actualizar provedor*/ 


         /*End block cargar imagen avatar*/ 
        const folderNames = ["constancia_situacion_fiscal","acta_constitutiva","poderes","opinion_cumplimiento_obligaciones","comprobante_domicilio","identificacion_oficial","curriculum","catalogo","lista_precios"];
        folderNames.forEach( function(element) {
          //console.log(event.target[element].files[0])
        let documento = event.target[element].files[0];
         let formDataD = new FormData();
         const endpoinDocuemntos = "https://backendbrick.cuartelvr.com/materiales/v1/api/documento";
         formDataD.append("userId", usuario.id);
         formDataD.append("folderName", event.target[element].name);
         formDataD.append("documento", documento);
         axios.post(endpoinDocuemntos, formDataD, {
             headers: {
                 'Content-Type': 'multipart/form-data'
             }
         }).then(function(response){
             console.log(response.data.path);
             
         }).catch(function(error){
             console.log("error saving document => " + error)
         });
         
          if(element=="lista_precios"){
            window.location.href = "/proveedor/";
          }
          });
        
      }
 
    
      
    return(
        <div className="container-fluid">
            <div className="row">

            <div className=" col-sm-12 b-titulo">
            <h4>Estamos a un paso de comenzar solo hay que completar tu perfil !Vamos¡</h4>
            </div>
            </div>
            <form onSubmit={usuarioDocuments}>

            <div className="row">
            <div className="col-sm-4 b-forms" >
            <label>Imagen de perfil </label>
            <TextField
              autoComplete="fname"
              name="proveedor"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="proveedor"
              autoFocus
             />
            
            <label>Giro Empresarial</label>
            <TextField
              autoComplete="fname"
              name="giro"
              type="text"
              variant="outlined"
              required
              fullWidth
              id="giro"
              autoFocus
             />
            <label>Promedio de Ventas</label>
            <TextField
              autoComplete="fname"
              name="promedio_ventas"
              type="text"
              variant="outlined"
              required
              fullWidth
              id="promedio_ventas"
              autoFocus
             />
            <label>Dirección de la Sucursal</label>
            <TextField
              autoComplete="fname"
              name="direccion"
              type="text"
              variant="outlined"
              required
              fullWidth
              id="direccion"
              autoFocus
             />
            <label>Identificación Oficial (INE o Pasaporte)</label>
            <TextField
              autoComplete="fname"
              name="identificacion_oficial"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="identificacion_oficial"
              autoFocus
             />
            </div>
         
            <div  className="col-sm-4 b-forms">
            <label>Constancia de situacion fiscal</label>
            <TextField
              autoComplete="fname"
              name="constancia_situacion_fiscal"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="constancia_situacion_fiscal"
              autoFocus
             />
            
            <label>Acta constitutiva</label>
            <TextField
              autoComplete="fname"
              name="acta_constitutiva"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="acta_constitutiva"
              autoFocus
             />
            <label>Poderes</label>
            <TextField
              autoComplete="fname"
              name="poderes"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="poderes"
              autoFocus
             />
            <label>Comprobante de domicilio (no mayor a 3 meses) </label>
            <TextField
              autoComplete="fname"
              name="comprobante_domicilio"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="comprobante_domicilio"
              autoFocus
             />
            <label>Curriculum</label>
            <TextField
              autoComplete="fname"
              name="curriculum"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="curriculum"
              autoFocus
             />

            </div>
            <div  className="col-sm-4 b-forms">
            <label>Opinión de cumplimiento de obligaciones</label>
            <TextField
              autoComplete="fname"
              name="opinion_cumplimiento_obligaciones"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="opinion_cumplimiento_obligaciones"
              autoFocus
             />
            <label>Catalogo</label>
            <TextField
              autoComplete="fname"
              name="catalogo"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="catalogo"
              autoFocus
             />
            <label>Lista de precios</label>
            <TextField
              autoComplete="fname"
              name="lista_precios"
              type="file"
              variant="outlined"
              required
              fullWidth
              id="lista_precios"
              autoFocus
             />
           
            <button type="submit" className="btn btn-success" >Guardar</button>

            </div>
            </div>
            </form>

        </div>
    );
}
export default SeguimientoRegistro;