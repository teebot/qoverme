import { gql } from "apollo-boost";

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      token
      error
    }
  }
`;

export const SAVE_QUOTE_DRAFT_MUTATION = gql`
  mutation SaveQuote($quote: QuoteInput!) {
    saveQuote(quote: $quote)
  }
`;
