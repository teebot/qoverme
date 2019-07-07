import { gql } from "apollo-boost";

export const RESULTS_QUERY = gql`
  query Quotes {
    quotes {
      id
      age
      carBrand
      carPurchasePrice
      plan
    }
  }
`;
