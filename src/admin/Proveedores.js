import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';

const Proveedores = (props) => {
    const [proveedor, setProveedor ] = useState(
        {   
            'name': 'Proveedor',
            'icon': 'user-circle',
            'tabla': 'proveedores',
            'redirect': "/admin/proveedores",
            'endpoint': 'https://webdevelopersgdl.com/comercializadora-material/v1/api/proveedor/',
            'fields': [
                    
                {   
                    'title': "Empresa razon Social",
                    'name': "empresaRazonSocial",
                    'type': 'text',
                    'xs': 12,
                    'sm': 12
                },   
                {   
                    'title': "Correo Empresarial",
                    'name': "correoEmpresarial",
                    'type': 'text',
                    'xs': 12,
                    'sm': 12
                },
                {   
                    'title': "Imagen",
                    'name': "urlImagen",
                    'type': 'file',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Cargo Empresarial",
                    'name': "cargoEmpresarial",
                    'type': 'text',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Telefono",
                    'name': "telefono",
                    'type': 'text',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Contraseña",
                    'name': "password",
                    'type': 'password',
                    'xs': 12,
                    'sm': 6
                }
            ]
        }
    );
    const [proveedores, setProveedores] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProveedores();
        
    }, []);

    const getProveedores = () => {
        setLoading(true);
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/proveedor/';

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
            setProveedores(
                responseData
            );
            console.log(responseData);
        }
            //     console.log(response.data.data);
            //     setProveedores(response.data.data);
            //     setKeys(
            //         response
            //     );
            // }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <div className="proveedores-container">
            <Loading loading={loading} />

            <div className="b-btn-createItem">
                <NavLink to="/admin/registrar" onClick={()=> props.nuevoRegistro(proveedor)}>
                    <button className="btn btn-addProveedor">Agregar Proveedor</button>
                </NavLink>
            </div>

            <TableItems componentName="Proveedores" headCells={headCells} data={proveedores}/>
        </div>
    );
}

export default Proveedores;