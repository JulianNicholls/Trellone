import axios from 'axios';

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
  try {
    const boards = await axios.get('/api/boards', {
      headers: {
        Authorization: getState().auth.token
      }
    });

    // console.log(boards);

    dispatch({ type: LOAD_BOARDS, boards: boards.data });
  } catch (error) {
    dispatch(logout());
  }
};

export const createBoard = board => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/boards/create', board, {
      headers: {
        Authorization: getState().auth.token
      }
    });

    dispatch({ type: ADD_BOARD, board: response.data });
  } catch (error) {
    console.error(error);
    dispatch(logout());
  }
};

export const loadBoard = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/boards/${id}`, {
      headers: {
        Authorization: getState().auth.token
      }
    });

    //  console.log(response);

    dispatch({ type: LOAD_BOARD, board: response.data });
  } catch (error) {
    dispatch(logout());
  }
};
