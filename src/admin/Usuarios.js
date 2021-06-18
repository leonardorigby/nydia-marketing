import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import TableItems from '../components/TableItems';
import axios from 'axios';
import Loading from '../components/Loading';

const Usuarios = (props) => {

    const [usuario, setUsuario ] = useState(
        {   
            'name': 'Usuario',
            'icon': 'user-circle',
            'tabla': 'usuarios',
            'endpoint': 'https://webdevelopersgdl.com/comercializadora-material/v1/api/usuario/',
            'fields': [
                    
                {   
                    'title': "Nombre",
                    'name': "nombre",
                    'type': 'text',
                    'xs': 12,
                    'sm': 6
                },   
                {   
                    'title': "Apellidos",
                    'name': "apellidos",
                    'type': 'text',
                    'xs': 12,
                    'sm': 6
                },
                {   
                    'title': "Imagen",
                    'name': "urlImagen",
                    'type': 'file',
                    'xs': 12,
                    'sm': 12
                },
                {   
                    'title': "Correo Electronico",
                    'name': "correoElectronico",
                    'type': 'text',
                    'xs': 12,
                    'sm': 12
                },
                {   
                    'title': "Perfil",
                    'name': "perfilId",
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

    const [usuarios, setUsuarios] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        getUsuarios();
        
    }, []);

    const getUsuarios = () => {
        setLoading(true);
        const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/usuario/';

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
            setUsuarios(
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
        <div className="usuarios-container">
            <Loading loading={loading}/>


            <div className="b-btn-createItem">
                <NavLink to="/admin/registrar" onClick={()=> props.nuevoRegistro(usuario)}>
                    <button className="btn btn-addUsuario" >Agregar Usuario</button>
                </NavLink>
            </div>
            <TableItems componentName="Usuarios" headCells={headCells} data={usuarios}/>

            {/* <Route exact path="/admin/usuarios/hola/"><CreateItems /></Route> */}
            {/* <Route component={NoMatch}/> */}

            
        </div>
    );
}

export default Usuarios;