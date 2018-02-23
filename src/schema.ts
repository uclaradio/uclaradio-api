import * as path from 'path';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
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
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const typeDefs = importSchema(path.join(__dirname, './schema/index.graphql'));

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
