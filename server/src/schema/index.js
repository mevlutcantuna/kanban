const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
  }

  type Query {
    hello: String!
    getUser(id: ID): User
  }

  input UserInput {
    fullName: String!
    email: String!
    password: String!
  }

  type Mutation {
    register(user: UserInput): User!
  }
`;

module.exports = typeDefs;
