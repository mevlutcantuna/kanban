import { gql } from "@apollo/client";

export const GET_ALL_COLUMNS = gql`
  query GetAllColumns($userId: String!) {
    getAllColumns(userId: $userId) {
      id
      name
      taskIds
    }
  }
`;

export const CREATE_COLUMN = gql`
  mutation CreateColumn($column: ColumnInput) {
    createColumn(column: $column) {
      id
      taskIds
      name
    }
  }
`;

export const UPDATE_COLUMN = gql`
  mutation UpdateColumn($column: ColumnInput!) {
    updateColumn(column: $column) {
      id
      name
      taskIds
    }
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($deleteColumnId: ID!) {
    deleteColumn(id: $deleteColumnId) {
      id
      name
      user
      taskIds
    }
  }
`;
