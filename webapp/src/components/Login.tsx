import React, { useState, FormEvent } from "react";
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
import { useMutation } from "react-apollo";
import { AUTHENTICATE_MUTATION } from "../gql/mutations";
import { History } from "history";
import { LOCALSTORAGE_TOKEN } from "../constants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: "350px"
  },
  button: {
    marginTop: theme.spacing(2)
  },
  textField: {
    display: "block"
  },
  accessBtn: {
    textTransform: "none",
    color: "rgba(255,255,255,0.8)",
    marginTop: theme.spacing(2)
  }
}));

export default function Login(props: { history: History }) {
  const classes = useStyles();
  const { history } = props;
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [mutate] = useMutation<{ authenticate: { token: string } }>(
    AUTHENTICATE_MUTATION
  );
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await mutate({
      variables: {
        username,
        password
      },
      update: (_, result) => {
        if (!result.data || !result.data.authenticate) {
          throw Error("Invalid Gql response");
        }
        localStorage.setItem(
          LOCALSTORAGE_TOKEN,
          result.data.authenticate.token
        );
        history.push("/quote");
      }
    });
  };

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
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="h5"
          >
            Welcome to Qover
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              id="username"
              label="Username"
              className={classes.textField}
              type="text"
              autoComplete="current-username"
              margin="normal"
              fullWidth
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              fullWidth
              autoComplete="current-password"
              margin="normal"
              onChange={e => setPassword(e.target.value)}
            />

            <Grid spacing={6} container direction="row" alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="rememberMe" color="primary" />}
                  label={<Typography variant="caption">Remember me</Typography>}
                />
              </Grid>
              <Grid item>
                <Link color="secondary" variant="caption">
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              className={classes.button}
              fullWidth
              color="secondary"
              variant="contained"
              size="large"
            >
              Sign in to your account
            </Button>
          </form>
        </Paper>
        <Grid container alignItems="center" justify="center">
          <Button
            fullWidth
            className={classes.accessBtn}
            size="large"
            type="submit"
            color="default"
            variant="outlined"
          >
            Don’t have an account? Ask access
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
