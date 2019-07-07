import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Quote from "./components/Quote";
import Price from "./components/Price";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { reducer, initialState } from "./state/state";
import { setQuoteParams, setInvoiceFreq } from "./state/actions";
import { gqlClient } from "./gql/client";
import { ApolloProvider } from "react-apollo";
import { calcPlans } from "./state/calc-plans";
import Results from "./components/Results";
import { makeStyles, Theme, CssBaseline, Grid } from "@material-ui/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridGap: "10px",
    gridTemplateRows: "80px 1fr 80px",
    height: "100%"
  },
  container: {
    gridColumn: "1/span 6"
  },
  header: {
    gridColumn: "1/span 6",
    color: "#fff"
  },
  footer: { gridColumn: "1/span 6", color: "#fff" }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ApolloProvider client={gqlClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <div className={classes.root}>
            <div className={classes.header}>
              <Header />
            </div>
            <div className={classes.container}>
              <Grid
                container
                justify="center"
                spacing={6}
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <Route path="/" exact component={Login} />
                  <Route
                    path="/quote"
                    exact
                    render={({ history }) => (
                      <Quote
                        initialState={state.quoteParams}
                        history={history}
                        setQuoteParams={params =>
                          dispatch(setQuoteParams(params))
                        }
                      />
                    )}
                  />
                  <Route
                    path="/price"
                    exact
                    render={({ history }) => (
                      <Price
                        plans={calcPlans(state)}
                        history={history}
                        invoiceFreq={state.invoiceFreq}
                        quoteParams={state.quoteParams}
                        onSetInvoiceFreq={freq =>
                          dispatch(setInvoiceFreq(freq))
                        }
                      />
                    )}
                  />
                  <Route path="/results" exact component={Results} />
                </Grid>
              </Grid>
            </div>
            <div className={classes.footer}>
              <Footer />
            </div>
          </div>
          {/* <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/quote">Quote</Link>
                </li>
                <li>
                  <Link to="/price">Price</Link>
                </li>
              </ul>
            </nav> */}
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
