import express from "express";
import { graphqlApp } from "./graphql/app";
import chalk from "chalk";

const app = express();
app.use(express.json());

app.use("/gql", graphqlApp);

app.listen(process.env.PORT, () =>
  console.log(
    chalk.bgMagenta.bold(`QOVER Server started on PORT ${process.env.PORT}`)
  )
);
