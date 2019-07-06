import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Theme,
  TextField,
  Checkbox,
  FormControlLabel,
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import logo from "../logo.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  form: {},
  textField: {
    display: "block"
  }
}));

export default function Login() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      spacing={6}
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <img src={logo} alt="qover logo" />
      </Grid>
      <Grid item>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h5">
            Welcome to Qover
          </Typography>
          <form className={classes.form}>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              type="email"
              autoComplete="current-email"
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox value="rememberMe" color="primary" />}
              label="Remember me"
            />
            <Link color="secondary">Forgot your password?</Link>
          </form>
          <Button color="secondary" variant="contained">
            Sign in to your account
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
