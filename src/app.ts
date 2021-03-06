import * as path from 'path';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as dotenv from 'dotenv';

import { notFoundHandler, errorHandler } from './errorHandling';
import schema from './schema';

dotenv.config();

/** Create Express server */
const app = express();

/** Logging */
app.use(logger('dev'));

/** Parse incoming request bodies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Favicon */
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

/** Routing */
app.get('/', (req: Request, res: Response) => {
  res.redirect('/graphiql');
});

app.use('/graphql', graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/** Error Handling */
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
