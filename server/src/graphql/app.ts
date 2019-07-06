import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { context } from "./context";
import { authenticated } from "./guard";
import { userRepository } from "../db/user-repository";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../constants";

export const graphqlApp = express();

const typeDefs = gql`
  type Query {
    me: User
    carBrands: [String]
  }
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Mutation {
    authenticate(username: String!, password: String!): Authentication
  }

  type Authentication {
    token: String
    error: String
  }
`;

const resolvers = {
  Query: {
    me: authenticated((parent, args, ctx) => ctx.currentUser),
    carBrands: () => ["AUDI", "BMW", "PORSCHE"]
  },
  Mutation: {
    authenticate: async (parent, args, ctx) => {
      const { username, password } = args;
      const user = await userRepository.findUserByUserName(username);

      if (!user) {
        return {
          error: "User not found"
        };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return {
          error: "Incorrect username password combination"
        };
      }

      const token = jsonwebtoken.sign(
        { ...user, password: undefined },
        JWT_SECRET
      );
      return { token };
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  context: context,
  introspection: true,
  playground: {
    endpoint: "/gql",
    settings: {
      "request.credentials": "include"
    } as any,
    tabs: [
      {
        endpoint: "/gql",
        query: `
        {
            me {
              email
              username
            }
            carBrands
        }`
      }
    ]
  }
});

apolloServer.applyMiddleware({ app: graphqlApp, path: "/" });
