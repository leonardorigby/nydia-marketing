import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import '../styles/store/Login.css';

export default function Login() {

  const [loading, setLoading] = useState(false);


  const usuarioLogin = (event) => {
    event.preventDefault();
    setLoading(true);


    const endpoint = 'https://webdevelopersgdl.com/comercializadora-material/v1/api/cliente/login';

    const credenciales = {
      'correoEmpresarial': event.target.correoElectronico.value,
      'password': event.target.password.value
    };

    axios.post(endpoint, JSON.stringify(credenciales)).then((response) => {
      console.log(response);
      setLoading(false);

      if(response.status == 200 && response.data.message === 'success') {
        localStorage.setItem('usuario', JSON.stringify(response.data.data));
        window.location.href = "/store/productos";
      }else {
        alert("Datos de sesión invalidos!!!")
      }

    }).catch((error)=> {
      setLoading(false);
      alert("Datos de sesión invalidos!!!")
      console.log(error.status);
    })

  }



  return (
    <div className="login-container">

      {/* Container */}
      <Container maxWidth="md">
        {/* Row */}
        <Grid container spacing={2}>
          {/* Cols*/}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <h1>Login</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <h1>Login</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <h1>Login</h1>
          </Grid>

        </Grid>
      </Container>


      {/* tu codigo */}

      {/* <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form}  onSubmit={usuarioLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="correoElectronico"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
                        <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
            <NavLink to="/store/registrar">
            {"¿No tienes cuenta? Regístrala ahora."}
                </NavLink>
                
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </ThemeProvider> */}
    </div>
  );
}