import { GET_USER, LOGIN, REGISTER } from "../graphql/auth";
import { GET_ALL_COLUMNS } from "../graphql/column";
import { GET_ALL_TASKS } from "../graphql/task";

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

export const getAllColumns = {
  request: {
    query: GET_ALL_COLUMNS,
    variables: {
      userId: "1",
    },
  },
  result: {
    data: {
      getAllColumns: [
        {
          id: "column-1",
          name: "To do",
          taskIds: ["1", "2"],
        },
        {
          id: "column-2",
          name: "In progress",
          taskIds: [],
        },
        {
          id: "column-3",
          name: "Done",
          taskIds: [],
        },
      ],
    },
  },
};

export const getAllTasks = {
  request: {
    query: GET_ALL_TASKS,
    variables: {
      userId: "1",
    },
  },
  result: {
    data: {
      getAllTasks: [
        {
          id: "1",
          content: "Take out the garbage",
          tag: "Medium",
          columnId: "column-1",
          user: "1",
        },
        {
          id: "2",
          content: "Watch my favorite show",
          tag: "Medium",
          columnId: "column-1",
          user: "1",
        },
      ],
    },
  },
};
