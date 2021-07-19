import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';

const Productos = (props) => {

    const [producto, setProducto ] = useState(
        {   
            'name': 'Producto',
            'icon': 'user-circle',
            'tabla': 'productos',
            'redirect': "/admin/productos",
            'endpoint': 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/',
            'fields': [
                    
                {   
                    'title': "Nombre",
                    'name': "nombre",
                    'type': 'text',
                    'xs': 12,
                    'sm': 12
                },   
                {   
                    'title': "Material",
                    'name': "materialId",
                    'type': 'text',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Imagen",
                    'name': "urlImagen",
                    'type': 'file',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Datos Adicionales",
                    'name': "datosAdicionales",
                    'type': 'text',
                    'xs': 12,
                    'sm': 12
                },
                {   
                    'title': "Proveedor",
                    'name': "proveedorId",
                    'type': 'number',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Categoria",
                    'name': "categoriaId",
                    'type': 'number',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Stock",
                    'name': "stock",
                    'type': 'number',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Precio",
                    'name': "precio",
                    'type': 'number',
                    'xs': 12,
                    'sm': 6
                }
            ]
        }
    );

    const [productos, setProductos] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        getProductos();
        
    }, []);

    const getProductos = () => {
        setLoading(true);
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/producto/';

        axios.get(endpoint, { headers: {"Authorization" : `Bearer ${props.admin.jwt}`} }).then((response) =>{
            setLoading(false);
            let responseData = response.data.data;
            if(responseData.length > 0 ) {

            let responseKeys = Object.keys(response.data.data[0]);
            let objectKeys = [];

            responseKeys.forEach(name => {
                let cell = { 
                    "id": name, 
                    "numeric": false, 
                    "disablePadding": true, 
                    "label": name
                };

                objectKeys.push(cell)
                
            });
            let cellEdit = { 
                "id": 'edit', 
                "numeric": false, 
                "disablePadding": true, 
                "label": 'edit'
            };
            let cellDelete = { 
                "id": 'delete', 
                "numeric": false, 
                "disablePadding": true, 
                "label": 'delete'
            };
            objectKeys.push(cellEdit)
            objectKeys.push(cellDelete)
            
            setHeadCells(
                objectKeys
            );
            setProductos(
                responseData
            );
            console.log(responseData);
        }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <div className="roductos-container">
            <Loading loading={loading}/>


            <div className="b-btn-createItem">
                <NavLink to="/admin/registrar" onClick={()=> props.nuevoRegistro(producto)}>
                    <button className="btn btn-addProducto" >Agregar Producto</button>
                </NavLink>
            </div>
            <TableItems componentName="Productos" headCells={headCells} data={productos}/>

            {/* <Route exact path="/admin/usuarios/hola/"><CreateItems /></Route> */}
            {/* <Route component={NoMatch}/> */}

            
        </div>
    );
}

export default Productos;