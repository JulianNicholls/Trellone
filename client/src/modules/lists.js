import axios from 'axios';
import { logout } from './auth';

const LOAD_LISTS = 'boards/LOAD_LISTS';
const ADD_LIST = 'boards/ADD_LIST';
const REMOVE_LIST = 'boards/REMOVE_LIST';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_LISTS:
      return action.lists;

    case ADD_LIST:
      return [...state, action.list];

    case REMOVE_LIST:
      return state.filter(({ _id }) => _id !== action.id);

    default:
      return state;
  }
};

export const loadLists = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/lists/board/${id}`, {
      headers: { Authorization: getState().auth.token }
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
    const response = await axios.post('/api/lists/create', list, {
      headers: { Authorization: getState().auth.token }
    });

    //  console.log({ data: response.data });

    dispatch({ type: ADD_LIST, list: response.data });
  } catch (error) {
    // console.error(error);
    dispatch(logout());
  }
};

export const archiveList = id => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/lists/${id}/archive`, null, {
      headers: { Authorization: getState().auth.token }
    });

    console.log({ response });

    dispatch({ type: REMOVE_LIST, id });
  } catch (error) {
    console.error(error);
    //    dispatch(logout());
  }
};
