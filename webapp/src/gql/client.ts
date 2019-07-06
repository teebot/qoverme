import ApolloClient, { Operation } from "apollo-boost";
import { LOCALSTORAGE_TOKEN } from "./../constants";
export const gqlClient = new ApolloClient({
  uri: "http://localhost:3001/gql",
  request: async (operation: Operation) => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
    if (token) {
      operation.setContext({
        headers: {
          authorization: token
        }
      });
    }
  }
});
