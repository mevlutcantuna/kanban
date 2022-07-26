import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetAllTasks($userId: String!) {
    getAllTasks(userId: $userId) {
      id
      content
      columnId
      user
      tag
    }
  }
`;
