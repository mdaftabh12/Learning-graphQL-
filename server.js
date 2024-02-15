import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fackdb.js";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    quotes: [Quotes]
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quotes]
  }
  type Quotes {
    by: ID
    name: String
  }
`;
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
    quotes: () => quotes,
  },
  User: {
    quotes: (user) => quotes.filter((quote) => quote.by == user.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
