import React, { useState } from "react";
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
    padding: theme.spacing(2)
  },
  form: {},
  textField: {
    display: "block"
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
  const handleLogin = async () => {
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
          <Typography variant="h5" component="h5">
            Welcome to Qover
          </Typography>
          <form className={classes.form}>
            <TextField
              id="username"
              label="Username"
              className={classes.textField}
              type="text"
              autoComplete="current-username"
              margin="normal"
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="rememberMe" color="primary" />}
              label="Remember me"
            />
            <Link color="secondary">Forgot your password?</Link>
          </form>
          <Button color="secondary" onClick={handleLogin} variant="contained">
            Sign in to your account
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
