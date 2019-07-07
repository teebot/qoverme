import React from "react";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/styles";
import { Theme, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "rgba(255, 255, 255, 0.1)"
  },
  icon: {
    position: "relative",
    top: theme.spacing(0.4)
  }
}));

export function Header() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      alignItems="center"
    >
      <Grid item>
        <ChevronLeft className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="caption">QOVER.ME</Typography>
      </Grid>
    </Grid>
  );
}
