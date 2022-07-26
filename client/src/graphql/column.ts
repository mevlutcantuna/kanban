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
