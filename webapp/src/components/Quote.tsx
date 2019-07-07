import React from "react";
import {
  Grid,
  Paper,
  Button,
  Theme,
  TextField,
  FormControl,
  Select,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Formik } from "formik";
import { History } from "history";

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
  setQuoteParams: (params: {
    age: number;
    carBrand: string;
    carPurchasePrice: number;
  }) => void;
  history: History;
  initialState: {
    age?: number;
    carBrand: string;
    carPurchasePrice?: number;
  };
};

export default function Quote(props: QuoteProps) {
  const classes = useStyles();
  const { history, setQuoteParams } = props;

  return (
    <Grid container justify="center" spacing={6} alignItems="center">
      <Grid item>
        <Paper className={classes.root}>
          <Formik
            initialValues={props.initialState}
            validate={values => {
              const errors: { [k: string]: string } = {};
              if (!values.age) {
                errors.age = "Required";
              } else if (values.age < 18) {
                errors.age = "Sorry! The driver is too young";
              } else if (!values.carPurchasePrice) {
                errors.carPurchasePrice = "Required";
              } else if (values.carPurchasePrice < 5000) {
                errors.carPurchasePrice =
                  "Sorry! The price of the car is too low";
              } else if (!values.carBrand) {
                errors.carBrand = "Required";
              } else if (
                values.carBrand === "porsche" &&
                values.age &&
                values.age < 25
              ) {
                errors.carBrand =
                  "Sorry! We can not accept this particular risk";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              if (values.age && values.carBrand && values.carPurchasePrice) {
                setQuoteParams({
                  age: values.age,
                  carBrand: values.carBrand,
                  carPurchasePrice: values.carPurchasePrice
                });
                history.push("/price");
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              isSubmitting,
              handleSubmit
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl>
                  <label>Age</label>
                  <TextField
                    type="number"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age || ""}
                  />
                  {errors.age && touched.age && (
                    <FormHelperText>{errors.age}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <label>Car</label>
                  <Select
                    native
                    inputProps={{
                      name: "carBrand"
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.carBrand || ""}
                  >
                    <option value="" />
                    <option value="audi">AUDI</option>
                    <option value="bmw">BMW</option>
                    <option value="porsche">PORSCHE</option>
                  </Select>
                  {errors.carBrand && touched.carBrand && (
                    <FormHelperText>{errors.carBrand}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <label>Purchase Price</label>
                  <TextField
                    type="number"
                    name="carPurchasePrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.carPurchasePrice || ""}
                  />
                  {errors.carPurchasePrice &&
                    touched.carPurchasePrice &&
                    errors.carPurchasePrice}
                </FormControl>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || !isValid}
                >
                  Get a price
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
