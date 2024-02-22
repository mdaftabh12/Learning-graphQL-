import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

// This is middleware
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, "AFTABHU12");
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
