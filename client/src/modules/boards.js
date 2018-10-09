import { logout } from './auth';

const LOAD_BOARDS = 'boards/LOAD_BOARDS';
const ADD_BOARD = 'boards/ADD_BOARD';
const LOAD_BOARD = 'boards/LOAD_BOARD';

export default (state = { boards: [], current: null }, action) => {
  switch (action.type) {
    case LOAD_BOARDS:
      return { ...state, boards: action.boards };

    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.board] };

    case LOAD_BOARD:
      return { ...state, current: action.board };

    default:
      return state;
  }
};

export const loadBoards = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3100/boards', {
    headers: {
      Authorization: getState().auth.token
    }
  });

  if (response.status === 401) return dispatch(logout());

  const boards = await response.json();

  // console.log(boards);

  dispatch({ type: LOAD_BOARDS, boards });
};

export const createBoard = board => async (dispatch, getState) => {
  try {
    const response = await fetch('http://localhost:3100/boards/create', {
      headers: {
        'Content-type': 'application/json',
        Authorization: getState().auth.token
      },
      method: 'POST',
      body: JSON.stringify(board)
    });

    if (response.status === 401) return dispatch(logout());

    const newBoard = await response.json();
    // console.log(newBoard);

    dispatch({ type: ADD_BOARD, board: newBoard });
  } catch (err) {
    console.error(err);
  }
};

export const loadBoard = id => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:3100/boards/${id}`, {
    headers: {
      Authorization: getState().auth.token
    }
  });

  if (response.status === 401) return dispatch(logout());

  const board = await response.json();

  //  console.log(board);

  dispatch({ type: LOAD_BOARD, board });
};
