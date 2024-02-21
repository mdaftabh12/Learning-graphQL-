import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://0.0.0.0:27017/graphQL")
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Import models here

import "./models/quoteModel.js";
import "./models/userModel.js";

import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
