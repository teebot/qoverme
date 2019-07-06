import React from "react";
import { Grid, Paper, Button, Theme, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { History } from "history";
import { InvoiceFreq } from "../types/invoice-freq.type";
import { Plan } from "../types/plan.type";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  form: {},
  textField: {
    display: "block"
  }
}));

type PriceProps = {
  history: History;
  invoiceFreq: InvoiceFreq;
  plans: Plan[];
  setInvoiceFreq: (invoiceFreq: InvoiceFreq) => void;
};

export default function Price(props: PriceProps) {
  const classes = useStyles();
  const { invoiceFreq, setInvoiceFreq, plans } = props;
  const toggleInvoiceFreq = () => {
    if (invoiceFreq === "monthly") {
      setInvoiceFreq("yearly");
    } else {
      setInvoiceFreq("monthly");
    }
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
        <Paper className={classes.root}>
          <form className={classes.form} />
          <Switch
            checked={invoiceFreq === "yearly"}
            onChange={toggleInvoiceFreq}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          {plans.map((plan, i) => (
            <div key={i}>
              {plan.name} - {plan.price}
            </div>
          ))}
          <Button color="primary" variant="contained">
            Select plan
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
