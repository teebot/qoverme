import React from "react";
import { Grid, Paper, Button, Theme, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { History } from "history";
import { InvoiceFreq } from "../types/invoice-freq.type";
import { Plan } from "../types/plan.type";
import { SAVE_QUOTE_DRAFT_MUTATION } from "../gql/mutations";
import { useMutation } from "react-apollo";
import { QuoteParams } from "../types/quote-params.type";

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
  quoteParams: QuoteParams;
  onSetInvoiceFreq: (invoiceFreq: InvoiceFreq) => void;
};

export default function Price(props: PriceProps) {
  const classes = useStyles();
  const { history, invoiceFreq, onSetInvoiceFreq, plans } = props;
  const toggleInvoiceFreq = () => {
    if (invoiceFreq === "monthly") {
      onSetInvoiceFreq("yearly");
    } else {
      onSetInvoiceFreq("monthly");
    }
  };

  const [mutate] = useMutation(SAVE_QUOTE_DRAFT_MUTATION);
  const saveQuote = async (plan: Plan) => {
    const { age, carBrand, carPurchasePrice } = props.quoteParams;
    await mutate({
      variables: {
        quote: {
          plan: plan.name,
          age,
          carBrand,
          carPurchasePrice
        }
      },
      update: (_, result) => {
        if (!result.data || !result.data.saveQuote) {
          throw Error("Invalid Gql response");
        }
        history.push(`/results#${result.data.saveQuote}`);
      }
    });
  };

  return (
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => saveQuote(plan)}
          >
            Select plan
          </Button>
        </div>
      ))}
    </Paper>
  );
}
