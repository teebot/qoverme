import React from "react";
import { Grid, Paper, Button, Theme, Switch, Box } from "@material-ui/core";
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
  selectPlan: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#fff",
    textAlign: "center"
  },
  textField: {
    display: "block"
  },
  planFreq: {
    color: "#fff",
    margin: theme.spacing(4, 0)
  },
  switchThumb: {
    background: "#fff"
  },
  plan: {
    height: 500,
    width: 323,
    "&:last-child": {
      marginLeft: 10
    }
  },
  planName: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  planPriceWrapper: {
    background: "rgba(49, 207, 218, 0.05)",
    textAlign: "center",
    padding: theme.spacing(2, 0),
    borderTop: "1px solid #eee"
  },
  planPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  planPriceCurrency: {
    margin: theme.spacing(1),
    fontSize: theme.typography.caption.fontSize
  },
  feature: {
    padding: theme.spacing(2, 0),
    textAlign: "center",
    fontSize: theme.typography.caption.fontSize,
    letterSpacing: -0.3,
    borderTop: "1px solid #eee",
    "&:last-child": {
      borderBottom: "1px solid #eee"
    }
  },
  button: {
    display: "block",
    color: "#fff",
    margin: "12px auto",
    width: "90%",
    height: "54px",
    textTransform: "none",
    fontWeight: "bold"
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
    <div>
      <h1 className={classes.selectPlan}>Select a plan</h1>
      <Grid
        container
        direction="row"
        className={classes.planFreq}
        alignItems="center"
        justify="center"
      >
        <div>PAY MONTHLY</div>
        <Switch
          classes={{ thumb: classes.switchThumb }}
          checked={invoiceFreq === "yearly"}
          color="primary"
          onChange={toggleInvoiceFreq}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <div>
          <strong>PAY YEARLY</strong>
        </div>
      </Grid>
      <Grid container direction="row">
        {plans.map((plan, i) => (
          <Paper className={classes.plan} key={i}>
            <div className={classes.planName}>
              <Box textAlign="center" fontSize="h5.fontSize" fontWeight={500}>
                {plan.name}
              </Box>
            </div>
            <div className={classes.planPriceWrapper}>
              <div className={classes.planPrice}>
                <Box
                  textAlign="center"
                  fontSize="h4.fontSize"
                  fontWeight={"fontWeightBold"}
                >
                  {formatPrice(plan.price)}
                </Box>
                <div className={classes.planPriceCurrency}>€</div>
              </div>
              <div>{invoiceFreq} incl taxes</div>
            </div>
            <div>
              <div className={classes.feature}>
                <strong>Maximum duration travel</strong> of{" "}
                <strong>{plan.coverage.maxTravelDurationDays} days</strong>
              </div>
              <div className={classes.feature}>
                <strong>Medical expenses reimbursement</strong> up to{" "}
                <strong>
                  {formatPrice(plan.coverage.maxMedicalExpenseAmount)} €
                </strong>
              </div>
              <div className={classes.feature}>
                <strong>Personal assistance abroad</strong> up to{" "}
                <strong>
                  {formatPrice(plan.coverage.abroadPersonalAssistanceAmount)} €
                </strong>
              </div>
              <div className={classes.feature}>
                <strong>Travel assistance abroad</strong> up to{" "}
                <strong>
                  {formatPrice(plan.coverage.abroadTravelAssistanceAmount)} €
                </strong>
              </div>
              <div className={classes.feature}>
                <strong>Coverage duration: 1 year</strong>
              </div>
            </div>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={() => saveQuote(plan)}
              className={classes.button}
            >
              Choose this plan
            </Button>
          </Paper>
        ))}
      </Grid>
    </div>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-BE").format(price);
}
