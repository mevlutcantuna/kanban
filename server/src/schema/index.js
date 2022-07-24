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
    content: String!
    columnId: ID!
    user: ID!
    tag: String!
  }

  type Column {
    id: ID!
    name: String!
    user: ID!
    taskIds: [ID!]!
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

  input TaskInput {
    id: ID
    content: String
    userId: ID
    columnId: ID
    tag: String
  }

  type Query {
    getUser(token: String): User!
    getAllColumns(userId: String!): [Column!]!
    getAllTasks(userId: String!): [Task!]!
  }

  type Mutation {
    register(user: RegisterInput): User!
    login(user: LoginInput): User!
    createColumn(column: ColumnInput): Column!
    deleteColumn(id: ID!): Column!
    createTask(task: TaskInput!): Task!
    updateTask(task: TaskInput!): Task!
    deleteTask(id: ID!): Task!
  }
`;

module.exports = typeDefs;
