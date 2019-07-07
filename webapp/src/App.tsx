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

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      {/* {JSON.stringify(state)} */}
      <ApolloProvider client={gqlClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Login} />
              <Route
                path="/quote"
                exact
                render={({ history }) => (
                  <Quote
                    initialState={state.quoteParams}
                    history={history}
                    setQuoteParams={params => dispatch(setQuoteParams(params))}
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
                    onSetInvoiceFreq={freq => dispatch(setInvoiceFreq(freq))}
                  />
                )}
              />
              <Route path="/results" exact component={Results} />
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
    </div>
  );
};

export default App;
