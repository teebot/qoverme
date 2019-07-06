import React, { useReducer } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Quote from "./components/Quote";
import Price from "./components/Price";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { reducer, State } from "./state/state";
import { setAge, setCarBrand } from "./state/actions";

const theme = createMuiTheme({
  typography: {
    // useNextVariants: true,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      main: "#31cfda"
    },
    secondary: {
      main: "#317bda",
      contrastText: "#fff"
    }
  },
  overrides: {
    MuiList: {
      root: {
        background: "#fff"
      }
    }
  }
});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { age: 0 });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Login} />
            <Route
              path="/quote"
              exact
              component={() => (
                <Quote
                  age={state.age}
                  setAge={(age?: number) => dispatch(setAge(age))}
                  setCarBrand={(carBrand: string) =>
                    dispatch(setCarBrand(carBrand))
                  }
                />
              )}
            />
            <Route path="/price" exact component={() => <Price {...state} />} />
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
    </div>
  );
};

export default App;
