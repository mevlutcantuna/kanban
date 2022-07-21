const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    token: String
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    hello: String!
    getUser(id: ID): User
  }

  type Mutation {
    register(user: RegisterInput): User!
    login(user: LoginInput): User!
  }
`;

module.exports = typeDefs;
