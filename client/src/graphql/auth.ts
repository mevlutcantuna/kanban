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

export { REGISTER };
