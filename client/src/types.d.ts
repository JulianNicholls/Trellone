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
