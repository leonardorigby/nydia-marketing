import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/components/ProductoShelf.css'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },    
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ProductoShelf = (props) => {
    // const [ producto ] = useState({"id": 3, name: "Producto"});


    const classes = useStyles();

  return (
    <Card className={classes.root + " productoShhelf-container"}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.producto.Imagen}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {props.producto.Nombre}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            
              <span id="type">Toneladas</span>
          </Typography>
          <Typography variant="body2"  component="p">
          <s id="priceOld">$ {props.producto.Precio} MXN</s>
          <strong>$ {props.producto.Precio} MXN</strong>
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        {/* <Button size="small" color="primary"> */}
            <button size="small" color="primary" className="btn" onClick={() => props.agregarProductoAlCarrito(props.producto)}>Agregar al carrito</button>
            <div><input type="number" size="small" className=" form-control" placeholder="1" /></div>

        {/* </Button> */}
      </CardActions>
    </Card>
  );
}
export default ProductoShelf;
