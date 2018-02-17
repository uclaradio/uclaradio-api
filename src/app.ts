import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import * as dotenv from "dotenv";

import { notFoundHandler, errorHandler } from "./errorHandling";
import schema from "./schema";

dotenv.config();

/** Create Express server */
const app = express();

/** Logging */
app.use(logger("dev"));

/** Parse incoming request bodies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Routing */
app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

app.use("/graphql", graphqlExpress({ schema }));
if (process.env.NODE_ENV !== "production") {
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}

/** Error Handling */
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
