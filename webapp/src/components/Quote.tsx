import React from "react";
import {
  Grid,
  Paper,
  Button,
  Theme,
  TextField,
  FormControl,
  Select,
  FormHelperText,
  Input,
  InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Formik } from "formik";
import { History } from "history";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8),
    minWidth: "935px",
    minHeight: "400px"
  },
  form: {
    width: "500px",
    margin: "0 auto"
  },
  grid: {
    display: "grid",
    gridAutoRows: "62px",
    gridTemplateColumns: "140px 1fr",
    alignItems: "center"
  },
  control: {
    position: "relative"
  },
  helperText: {
    position: "absolute",
    bottom: "-20px"
  },
  label: {
    fontSize: theme.typography.body1.fontSize
  },
  textField: {
    display: "block"
  },
  number: {
    width: "100px"
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
            errors.carPurchasePrice = "Sorry! The price of the car is too low";
          } else if (!values.carBrand) {
            errors.carBrand = "Required";
          } else if (
            values.carBrand === "porsche" &&
            values.age &&
            values.age < 25
          ) {
            errors.carBrand = "Sorry! We can not accept this particular risk";
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
            <div className={classes.grid}>
              <label className={classes.label}>Age</label>
              <FormControl className={classes.control}>
                <TextField
                  className={classes.number}
                  type="number"
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age || ""}
                />
                {errors.age && touched.age && (
                  <FormHelperText className={classes.helperText} error>
                    {errors.age}
                  </FormHelperText>
                )}
              </FormControl>

              <label className={classes.label}>Car</label>
              <FormControl className={classes.control}>
                <Select
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
                  <FormHelperText className={classes.helperText} error>
                    {errors.carBrand}
                  </FormHelperText>
                )}
              </FormControl>

              <label className={classes.label}>Purchase Price</label>
              <FormControl className={classes.control}>
                <Input
                  className={classes.number}
                  type="number"
                  name="carPurchasePrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                  value={values.carPurchasePrice || ""}
                />
                {errors.carPurchasePrice && touched.carPurchasePrice && (
                  <FormHelperText className={classes.helperText} error>
                    {errors.carPurchasePrice}
                  </FormHelperText>
                )}
              </FormControl>
              <div />
              <div>
                <Button
                  size="large"
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting || !isValid}
                >
                  Get a price
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
