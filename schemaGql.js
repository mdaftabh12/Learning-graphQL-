import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quotes]
    iquotes(by: ID!): [Quotes]
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quotes]
  }
  type Quotes {
    by: ID!
    name: String!
  }
  type Token {
    token: String!
  }
  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignIn: UserSigninInput!): Token
    createQuote(name: String!): String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
