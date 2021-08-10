import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import ProductoShelf from '../components/ProductoShelf';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Header from './Header';
import Footer from './Footer';
import Productos from './Productos';
import ProductsList from '../components/ProductsList';
import Producto from './Producto';
import Buscador from '../components/Buscador';
import CreateItems from '../components/CreateItems';




const Store = () => {
    const [ carrito, setCarrito ] = useState(JSON.parse(localStorage.getItem('carrito')));
    const [ usuario, setUsuario ] = useState(JSON.parse(localStorage.getItem('usuario')));
    const [ products, getProducts ] = useState([]);
    const [designStatus, setDesignStatus] = useState("column");

    const [registroProveedor, setRegistroProveedor ] = useState(
      {   
          'name': 'Proveedor',
          'icon': 'user-circle',
          'tabla': 'proveedores',
          'redirect': "/proveedor",
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
              },
              {   
                'title': "Constancia de situación Fiscal",
                'name': "file",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
            ,
            {   
                'title': "Acta constitutiva",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
            ,
            {   
                'title': "Comprobante Domicilio",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            },
            {   
                'title': "Copia de Identificación Oficial",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
          ]
      }
  );
    const [registroCliente, setRegistroCliente ] = useState(
      {   
          'name': 'Cliente',
          'icon': 'user-circle',
          'tabla': 'clientes',
          'redirect': "/store/login",
          'endpoint': 'https://webdevelopersgdl.com/comercializadora-material/v1/api/cliente/',
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
              },
              {   
                'title': "Constancia de situación Fiscal",
                'name': "file",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
            ,
            {   
                'title': "Acta constitutiva",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
            ,
            {   
                'title': "Comprobante Domicilio",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            },
            {   
                'title': "Copia de Identificación Oficial",
                'name': "",
                'type': 'file',
                'xs': 6,
                'sm': 6
            }
          ]
      }
  );

  useEffect(() => {
    console.log(carrito);
  },[carrito,usuario,products]);

  const setProducts = (productsArray) => {
    getProducts(productsArray)
    console.log(products)
}

  const agregarProductoAlCarrito = (producto) => {
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    let carritoItems = [];
    if( carritoStorage != null ) {

      carritoItems = JSON.parse(localStorage.getItem('carrito'));

      carritoItems.push(producto);

      localStorage.setItem('carrito', JSON.stringify(carritoItems));

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );

    }else {

      localStorage.setItem('carrito', JSON.stringify([producto]));

      setCarrito(
        JSON.parse(localStorage.getItem('carrito'))
      );
    }
  };

    return(
        <div className="store-container">
          <Header carrito={carrito} usuario={usuario} setProducts={setProducts}/>
          {/* <Route  ><Productos agregarProductoAlCarrito={agregarProductoAlCarrito} products={products}/></Route> */}
          {/* <Route  path="/store/producto/:id"  component={Producto} name="leo"></Route> */}
          {/* <Route
            path="/store/productos/:searchWord"
            render={(props) => (
              <Productos {...props} agregarProductoAlCarrito={agregarProductoAlCarrito} />
            )}
          /> */}
          <Route  path="/store/productos">
            <Productos design={designStatus}/>
            {/* <ProductsList agregarProductoAlCarrito={agregarProductoAlCarrito} products={products} /> */}
            </Route>
          <Route
            path="/store/producto/:id"
            render={(props) => (
              <Producto {...props} agregarProductoAlCarrito={agregarProductoAlCarrito} />
            )}
          />
          <Route  path="/store/login/"><Login /></Route>
          <Route  path="/store/registro/"><Registro /></Route>
          <Route  path="/store/search/"><Buscador /></Route>
          <Route exact path="/store/registrar/"><CreateItems data={registroCliente} /></Route>
          <Route exact path="/store/proveedor/"><CreateItems data={registroProveedor} /></Route>
          <Footer />
        </div>
    );
}
export default Store;