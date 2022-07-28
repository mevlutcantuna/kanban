import { LOGIN } from "../graphql/auth";

export const loginError: any = {
  request: {
    query: LOGIN,
    variables: {
      user: {
        email: "notfound@gmail.com",
        password: "123123",
      },
    },
  },
  error: new Error("User does not found..."),
};

export const loginSuccess: any = {
  request: {
    query: LOGIN,
    variables: {
      user: {
        email: "mock@gmail.com",
        password: "123123",
      },
    },
  },
  result: {
    data: {
      login: {
        id: "1",
        fullName: "Mock Mock",
        email: "mock@gmail.com",
        password: "123123",
        token: "token",
      },
    },
  },
};
