import React, { useState, useEffect } from 'react';

const Account = () => {
    const [proveedor, setProveedor] = useState(JSON.parse(localStorage.getItem('proveedor')));

    useEffect(() => {
        console.log(proveedor)
    },[])
    return (
        <div className="acount-container">
            <h1>Mi Cuenta</h1>
            <p>{proveedor.id}</p>
        </div>
    );
}

export default Account;