import React, { ChangeEvent } from "react";
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

type QuoteProps = {
  age?: number;
  carBrand?: string;
  carPurchasePrice?: number;
  setAge: (age?: number) => void;
  setCarBrand: (carBrand: string) => void;
  setCarPurchasePrice: (carPurchasePrice?: number) => void;
};

export default function Quote(props: QuoteProps) {
  const classes = useStyles();
  const {
    age,
    carBrand,
    carPurchasePrice,
    setAge,
    setCarBrand,
    setCarPurchasePrice
  } = props;

  const setNumber = (cb: (x?: number) => void) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const parsed = parseFloat(event.target.value);
    if (isNaN(parsed)) {
      cb(undefined);
      return;
    }
    cb(parsed);
  };

  const onSetCarBrand = (event: ChangeEvent<{ name?: string; value: any }>) =>
    setCarBrand(event.target.value);

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
          <form className={classes.form}>
            <FormControl>
              <label>Age</label>
              <TextField
                id="age"
                className={classes.textField}
                type="text"
                margin="normal"
                name="age"
                value={age || ""}
                onChange={setNumber(setAge)}
              />
            </FormControl>

            <FormControl>
              <label>Car</label>
              <Select
                native
                inputProps={{
                  name: "brand"
                }}
                onChange={onSetCarBrand}
              >
                <option value="audi">AUDI</option>
                <option value="bmw">BMW</option>
              </Select>
            </FormControl>

            <FormControl>
              <label>Purchase Price</label>
              <TextField
                id="purchasePrice"
                className={classes.textField}
                type="number"
                margin="normal"
                name="purchasePrice"
                onChange={setNumber(setCarPurchasePrice)}
              />
            </FormControl>
          </form>
          <Button color="primary" variant="contained">
            Get a price
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
