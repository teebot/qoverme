import React, { useReducer } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Quote from "./components/Quote";
import Price from "./components/Price";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { reducer, initialState } from "./state/state";
import { setAge, setCarBrand, setCarPurchasePrice } from "./state/actions";
import { gqlClient } from "./gql/client";
import { ApolloProvider } from "react-apollo";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      {JSON.stringify(state)}
      <ApolloProvider client={gqlClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Login} />
              <Route
                path="/quote"
                exact
                render={() => (
                  <Quote
                    age={state.age}
                    carBrand={state.carBrand}
                    carPurchasePrice={state.carPurchasePrice}
                    setAge={(age?: number) => dispatch(setAge(age))}
                    setCarBrand={(carBrand: string) =>
                      dispatch(setCarBrand(carBrand))
                    }
                    setCarPurchasePrice={(carPurchasePrice?: number) =>
                      dispatch(setCarPurchasePrice(carPurchasePrice))
                    }
                  />
                )}
              />
              <Route path="/price" exact render={() => <Price {...state} />} />
            </div>
            <nav>
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
            </nav>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
