import express from "express";
import { graphqlApp } from "./graphql/app";
import path from "path";
import chalk from "chalk";

const app = express();
app.use(express.json());

app.use("/gql", graphqlApp);
app.use(express.static(path.join(__dirname, "../webapp")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../webapp/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(
    chalk.bgMagenta.bold(`QOVER Server started on PORT ${process.env.PORT}`)
  )
);
