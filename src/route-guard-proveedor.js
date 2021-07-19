import React from 'react';
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (

        localStorage.getItem('proveedor') != null && localStorage.getItem('proveedor') != "undefined" && localStorage.getItem('proveedor') != undefined

            ? <Component {...props} />

            : <Redirect to='/login/proveedor-login' />

    )} />
)

export default RouteGuard;