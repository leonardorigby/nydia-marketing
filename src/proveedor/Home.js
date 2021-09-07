import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import '../styles/proveedor/Home.css'


const Home = () => {
    const [proveedor, setProveedor] = useState(JSON.parse(localStorage.getItem('proveedor')));
    useEffect(() => {
        console.log(proveedor)
    },[])
    return (
        <div className="homeProveedor-container">
            <h1>{proveedor.razonSocial} | <small className="text-muted"> {proveedor.cargoEmpresarial} </small></h1>
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <img src="https://www.forcemanager.com/wp-content/uploads/blog_Como_hacer_un_reporte_de_ventas6.png"/>
              <img src=" https://hardzone.es/app/uploads-hardzone.es/2020/02/Ventas-GPUs.jpg"/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className="productos">
                <h5 className="sub-title">Productos más Vendidos en la Semana</h5>
                <img src="https://www.nicepng.com/png/full/380-3808499_precio-tienda-de-cemento-cemento-cruz-azul.png"/>
                <img src="https://www.nicepng.com/png/full/380-3808499_precio-tienda-de-cemento-cemento-cruz-azul.png"/>
                <img src="https://www.nicepng.com/png/full/380-3808499_precio-tienda-de-cemento-cemento-cruz-azul.png"/>
                <img src="https://www.nicepng.com/png/full/380-3808499_precio-tienda-de-cemento-cemento-cruz-azul.png"/>
              <img src="https://www.nicepng.com/png/full/380-3808499_precio-tienda-de-cemento-cemento-cruz-azul.png"/>
            
            </Grid>
        </div>
    );
}

export default Home;