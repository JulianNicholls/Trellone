import axios from 'axios';
import { logout } from './auth';

const LOAD_LISTS = 'boards/LOAD_LISTS';
const ADD_LIST = 'boards/ADD_LIST';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_LISTS:
      return action.lists;

    case ADD_LIST:
      return [...state, action.list];

    default:
      return state;
  }
};

export const loadLists = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:3100/lists/board/${id}`, {
      headers: {
        Authorization: getState().auth.token
      }
    });

    //  console.log({ data: response.data });

    dispatch({ type: LOAD_LISTS, lists: response.data });
  } catch (error) {
    // console.error(error);
    dispatch(logout());
  }
};

export const createList = list => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      'http://localhost:3100/lists/create',
      list,
      {
        headers: {
          Authorization: getState().auth.token
        }
      }
    );

    //  console.log({ data: response.data });

    dispatch({ type: ADD_LIST, list: response.data });
  } catch (error) {
    // console.error(error);
    dispatch(logout());
  }
};
