import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation register($user: RegisterInput) {
    register(user: $user) {
      fullName
      password
      token
      email
      id
    }
  }
`;

const LOGIN = gql`
  mutation login($user: LoginInput) {
    login(user: $user) {
      fullName
      password
      email
      token
      id
    }
  }
`;

const GET_USER = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      fullName
      id
    }
  }
`;

export { REGISTER, LOGIN, GET_USER };
