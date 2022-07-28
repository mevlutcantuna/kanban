export interface IColumn {
  id?: string;
  name?: string;
  taskIds?: string[];
  user?: string;
  __typename?: string;
}

export interface ITask {
  id?: string;
  content?: string;
  user?: string;
  columnId?: string;
  tag?: string;
  __typename?: string;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface IState {
  tasks: {
    [key: string]: ITask;
  };
  columns: {
    [key: string]: IColumn;
  };
}
