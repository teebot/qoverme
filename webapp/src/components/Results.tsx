import React from "react";
import { useQuery } from "react-apollo";
import { RESULTS_QUERY } from "../gql/queries";
import { Quote } from "../types/quote.type";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
export default function Results() {
  const { data, error, loading } = useQuery(RESULTS_QUERY);
  if (loading) {
    return <div>Loading... ⏳</div>;
  }

  if (error || !data) {
    return <div>Oops something went wrong (눈⁠_⁠눈)</div>;
  }

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
        {quotes.map((quote, i) => (
          <>
            <a id={quote.id.toString()} />
            <TableRow key={i}>
              <TableCell>{quote.age}</TableCell>
              <TableCell>{quote.plan}</TableCell>
              <TableCell>{quote.carBrand}</TableCell>
              <TableCell>{quote.carPurchasePrice}</TableCell>
            </TableRow>
          </>
        ))}
      </Table>
    </Paper>
  );
}
