const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    token: String
  }

  type Task {
    id: ID!
    name: String!
    columnId: ID!
    user: ID!
    tag: String!
  }

  type Column {
    id: ID!
    name: String!
    user: ID!
    taskIds: [Task!]!
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

  input ColumnInput {
    name: String!
    userId: ID!
  }

  type Query {
    getUser(token: String!): User!
    getAllColumns(userId: String!): [Column!]!
  }

  type Mutation {
    register(user: RegisterInput): User!
    login(user: LoginInput): User!
    createColumn(column: ColumnInput): Column!
    deleteColumn(id: ID!): Column!
  }
`;

module.exports = typeDefs;
