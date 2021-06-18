import React from 'react';
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (

        localStorage.getItem('admin') != null && localStorage.getItem('admin') != "undefined" && localStorage.getItem('admin') != undefined

            ? <Component {...props} />

            : <Redirect to='/admin-login' />

    )} />
)

export default RouteGuard;