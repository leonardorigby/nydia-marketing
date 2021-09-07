import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { NavLink } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../styles/components/ItemShelf.css'

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

const ItemShelf = (props) => {
    // const [ producto ] = useState({"id": 3, name: "Producto"});
    const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={props.columnSize}  className={"product-item " + (props.design)}>
    <Card className={classes.root + " itemShhelf-container"}>
      <div className="b-image">
      <NavLink to={"/store/producto/" + (props.producto.id)}>
        <CardMedia
          className={classes.media}
          image={"https://backendbrick.cuartelvr.com/materiales/images/producto/" + props.producto.id+ "/1.png"}
          title={props.producto.nombre}
        />
        </NavLink>
      </div>
      <div className="b-info">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center" className="name">
            {props.producto.nombre}
          </Typography>
          <Typography variant="body2"  component="p">
          <strong className="price">$ {props.producto.precio} MXN</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        {/* <Button size="small" color="primary"> */}
        <NavLink to={"/store/producto/" + (props.producto.id)} className="product-link">
            <button color="primary" className="btn add-cartBtn">Ver Producto</button>
        </NavLink>
        {/* </Button> */}
      </CardActions>
      </div>
    </Card>
    </Grid>

  );
}
export default ItemShelf;
