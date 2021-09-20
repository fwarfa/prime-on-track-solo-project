import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginForm.css'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";

import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    
  }
});

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
    <center>
      <Paper
          variant="elevation"
          elevation={2}
          className="login-background"
          style={{marginLeft: 300, marginRight: 300}}
        >
        <form className="loginForm" onSubmit={login}>
        <Typography component="h1" variant="h5" style={{marginBottom: 10}}>
          Login
          </Typography>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <div>
          <TextField
                style={{marginBottom: 10}}
                variant="outlined"
                size="small"
                required
                type="text"
                name="username"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
          </div>
          <div>
          <TextField
                style={{marginBottom: 10}}
                variant="outlined"
                size="small"
                required
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
          </div>
          <div>
            <Button style={{marginRight: 10}}  type="submit" name="submit" variant="contained" size="small">Login In</Button>
          </div>
          <div>
            <Button
            type="button"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </div>
        </form>
      </Paper>
    </center>
    </div>
  );
}

export default LoginForm;
