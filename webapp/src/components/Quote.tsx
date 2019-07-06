import React, { ChangeEvent, useState } from "react";
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
  setAge: (age?: number) => void;
  setCarBrand: (carBrand: string) => void;
};

export default function Quote(props: QuoteProps) {
  const classes = useStyles();
  const { age, setAge, setCarBrand } = props;
  // const [age, setAge] = useState<string>("");
  const onSetAge = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(event.target.value);
    if (isNaN(parsed)) {
      setAge(undefined);
      return;
    }
    setAge(parsed);
  };

  const onSetCarBrand = (
    event: ChangeEvent<{ name?: string; value: any }>
  ) => {};
  // setCarBrand(event.target.value);

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
                onChange={onSetAge}
              />
            </FormControl>

            {/* <FormControl>
              <label>Car</label>
              <Select
                native
                inputProps={{
                  name: "brand"
                }}
                onChange={onSetCarBrand}
              >
                <option value="bmw">BMW</option>
              </Select>
            </FormControl> */}

            {/* <FormControl>
              <label>Purchase Price</label>
              <TextField
                id="purchasePrice"
                className={classes.textField}
                type="number"
                margin="normal"
                name="purchasePrice"
              />
            </FormControl> */}
          </form>
          <Button color="primary" variant="contained">
            Get a price
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
