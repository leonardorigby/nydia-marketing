import React, { useState, useEffect } from 'react';
import './App.css';
import Admin from './admin/';
import Store from './store/';
import Login from './store/Login';
import Register from './store/Register';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BrowserRouter, Redirect} from "react-router-dom";
import RouteGuard from './route-guard';

import LoginAdmin from './pages/LoginAdmin';
import LoginProveedor from './pages/LoginProveedor';

const App = () => {

  return (
    
    <div className="app-container">
        <BrowserRouter>
        {
          window.location.pathname == '/' && <Redirect to="/store/productos/" />
        }

          <Route  path="/store/"><Store /></Route>

          <RouteGuard path="/admin/" component={Admin}  />

          <Route  path="/admin-login"><LoginAdmin /></Route>

          <Route  path="/proveedor-login"><LoginProveedor /></Route>
          <Route  path="/register" ><Register /></Route>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
