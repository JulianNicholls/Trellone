interface Board {
  _id: string;
  name: string;
  backgroundURL: string;
  ownerId: string;
}

interface BoardState {
  boards: Array<Board>;
  boardById: (id: string) => Board | undefined;
  currentBoard: Board | undefined;
}

interface Task {
  _id: string;
  text: string;
  order: number;
  archived: boolean;
}

interface List {
  _id: string;
  name: string;
  order: number;
  boardId: string;
  archived: boolean;
  tasks: Array<Task>;
}

interface ListState {
  lists: Array<List>;
  addTask: (text: string, order: number, listId: string) => void;
  updateTask: (task: Task, listId: string) => void;
  updateList: (list: List) => void;
}

interface User {
  displayName: string;
  email: string;
  avatarURL: string;
}

interface UserState {
  token: string;
  user: User;
  login: (email: string, password: string) => Promise;
  signup: (
    email: string,
    password: string,
    displayName: string,
    avatarURL: string
  ) => Promise;
  logout: () => void;
}
