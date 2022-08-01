import { GET_USER, LOGIN, REGISTER } from "../graphql/auth";

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

export const signupError: any = {
  request: {
    query: REGISTER,
    variables: {
      user: {
        fullName: "Demo Demo",
        email: "existsuser@gmail.com",
        password: "123123",
      },
    },
  },
  error: new Error("The user exists..."),
};

export const signupSuccess = {
  request: {
    query: REGISTER,
    variables: {
      user: {
        fullName: "Demo Demo",
        email: "user@gmail.com",
        password: "123123",
      },
    },
  },
  result: {
    data: {
      register: {
        id: "1",
        fullName: "Demo Demo",
        email: "user@gmail.com",
        password: "123123",
      },
    },
  },
};

export const getUser = {
  request: {
    query: GET_USER,
    variables: {
      token: null,
    },
  },
  result: {
    data: {
      getUser: {
        id: "1",
        fullName: "Joe Doe",
      },
    },
  },
};
