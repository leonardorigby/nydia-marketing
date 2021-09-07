import React, { useState, useEffect } from 'react';
import '../styles/proveedor/Account.scss'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
const Account = () => {
    const [proveedor, setProveedor] = useState(JSON.parse(localStorage.getItem('proveedor')));

    useEffect(() => {
        console.log(proveedor)
    },[])
    const mystyle = {
        width: "540px"
      };
    return (
    
        <div className="login-container">

        {/* Container */}
        <Container maxWidth="md">
          {/* Row */}
          <Grid container spacing={2}>
            {/* Cols*/}
            <Grid item xs={12} sm={12} md={12} lg={12}>

            <div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={proveedor.urlImagen} className="img-fluid rounded-start" alt={proveedor.urlImagen} style={mystyle}/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{proveedor.razonSocial}</h5>
        <small className="text-muted">CARGO: {proveedor.cargoEmpresarial} </small>
        <p className="card-text">RFC: {proveedor.rfc} </p>
        <p className="card-text">CORREO: {proveedor.correoElectronico} </p>
        <p className="card-text"><small className="text-muted">{proveedor.direccionSucursal} </small></p>
      </div>
    </div>
  </div>
</div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h1>Mis Productos más Vendidos</h1>
                    <div className="card border-dark mb-3" >
  <div className="card-header">Header</div>
  <div className="card-body text-dark">
    <h5 className="card-title">Dark card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
            </Grid>

            </Grid>
            </Container>
            </div>
    );
}

export default Account;