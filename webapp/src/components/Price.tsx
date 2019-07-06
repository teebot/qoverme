import React from "react";
import {
  Grid,
  Paper,
  Button,
  Theme,
  TextField,
  FormControl,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  form: {},
  textField: {
    display: "block"
  }
}));

type PriceProps = { age?: number };

export default function Price(props: PriceProps) {
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
        <Paper className={classes.root}>
          <form className={classes.form} />
          <Button color="primary" variant="contained">
            Select plan
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
