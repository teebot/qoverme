import express from "express";
import { graphqlApp } from "./graphql/app";
import path from "path";
import chalk from "chalk";

const app = express();
app.use(express.json());

app.use("/gql", graphqlApp);
app.use(express.static(path.join(__dirname, "../webapp")));

app.listen(process.env.PORT, () =>
  console.log(
    chalk.bgMagenta.bold(`QOVER Server started on PORT ${process.env.PORT}`)
  )
);
