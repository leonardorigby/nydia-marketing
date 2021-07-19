import React  from 'react';
import '../styles/components/MiniCarrito.css'

let items;

const MiniCarrito = (props) => {

    
    console.log(props.carrito);

    if(props.carrito != null && props.carrito != undefined && props.carrito != 'undefined' ){
        items = props.carrito.map((item, index) => 
        <div className="item">
            <img src={item.urlImagen} />
            <span>{item.nombre}</span>
        </div>

    );
    }
    return(
        <div className="miniCarrito-container">
            {
                props.carrito != null

                ?   <div className="badge-minicarrito pointer">
                        {/* <span>{props.carrito[0].name}</span> */}
                        <i className="fas fa-shopping-cart"></i>
                        <span className="minicarrito-qty">{props.carrito.length}</span>
                    </div>
                :   <div className="badge-minicarrito pointer">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="minicarrito-qty">0</span>
                    </div>
                    
            }
            <div className="miniCarrito-items">
                {items}
            </div>

        </div>
    );
}

export default MiniCarrito;