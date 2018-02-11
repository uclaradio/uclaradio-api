import { makeExecutableSchema } from "graphql-tools";

const djs = [
  {
    id: 1,
    name: "B",
    picture: "pic.jpg",
    bio: "One half of Web.",
    shows: ["Geek Squad"]
  },
  {
    id: 2,
    name: "Huckleberry Spin",
    picture: "ya.png",
    bio: "The other half of Web.",
    shows: ["The Spicy Hour"]
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type DJ {
    id: ID!
    name: String!
    picture: String
    bio: String
    shows: [String]
  }

  type Query { djs: [DJ] }
`;

// The resolvers
const resolvers = {
  Query: { djs: () => djs }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
