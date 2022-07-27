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

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      content
      columnId
      user
      tag
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($task: TaskInput!) {
    updateTask(task: $task) {
      id
      content
      columnId
      user
      tag
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      id
      content
      columnId
      user
      tag
    }
  }
`;
