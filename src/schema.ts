import * as path from 'path';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import { shows, djs } from './mock-data';

// The resolvers
const resolvers = {
  Query: {
    djs: () => djs,
    dj: (id: Number) => djs[0],
    shows: () => shows,
    show: (id: Number) => shows[0],
  },
};

const typeDefs = importSchema(path.join(__dirname, './schema/index.graphql'));

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
