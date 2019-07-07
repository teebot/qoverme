import React from "react";
import { useQuery } from "react-apollo";
import { RESULTS_QUERY } from "../gql/queries";
import { Quote } from "../types/quote.type";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Theme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    background: theme.palette.primary.light
  }
}));

export default function Results() {
  const classes = useStyles();
  const { data, error, loading } = useQuery(RESULTS_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Oops something went wrong (눈⁠_⁠눈)</div>;
  }

  const selected = window.location.hash.substring(1);

  const quotes: Quote[] = data.quotes;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Age</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Car Brand</TableCell>
            <TableCell>Car Purchase Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((quote, i) => (
            <TableRow
              key={i}
              className={
                selected && quote.id === selected ? classes.selected : ""
              }
            >
              <TableCell>{quote.age}</TableCell>
              <TableCell>{quote.plan}</TableCell>
              <TableCell>{quote.carBrand}</TableCell>
              <TableCell>{quote.carPurchasePrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
