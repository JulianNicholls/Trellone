import axios from 'axios';
import { logout } from './auth';

const LOAD_LISTS = 'lists/LOAD_LISTS';
const ADD_LIST = 'lists/ADD_LIST';
const REMOVE_LIST = 'lists/REMOVE_LIST';
const ADD_TASK = 'lists/ADD_TASK';
const REMOVE_TASK = 'lists/REMOVE_TASK';

export default (state = [], action) => {
  let lists, updateIndex;

  switch (action.type) {
    case LOAD_LISTS:
      return action.lists;

    case ADD_LIST:
      return [...state, action.list];

    case REMOVE_LIST:
      return state.filter(({ _id }) => _id !== action.id);

    case ADD_TASK:
      lists = [...state];
      updateIndex = lists.findIndex(({ _id }) => _id === action.task.listId);

      lists[updateIndex].tasks.push(action.task);

      return lists;

    default:
      return state;
  }
};

export const loadLists = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/lists/board/${id}`, {
      headers: { Authorization: getState().auth.token }
    });

    const lists = response.data;
    // console.log({ lists });

    dispatch({ type: LOAD_LISTS, lists });
  } catch (error) {
    console.error({ error });
    dispatch(logout());
  }
};

export const createList = list => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/lists/create', list, {
      headers: { Authorization: getState().auth.token }
    });

    dispatch({ type: ADD_LIST, list: response.data });
  } catch (error) {
    console.error({ error });
    dispatch(logout());
  }
};

export const archiveList = id => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/lists/${id}/archive`, null, {
      headers: { Authorization: getState().auth.token }
    });

    if (response.data.nModified === 1) dispatch({ type: REMOVE_LIST, id });
  } catch (error) {
    console.error({ error });
    dispatch(logout());
  }
};

export const addTask = task => async (dispatch, getState) => {
  try {
    await axios.post('/api/tasks/create', task, {
      headers: { Authorization: getState().auth.token }
    });

    dispatch({ type: ADD_TASK, task });
  } catch (error) {
    console.error({ error });
    dispatch(logout());
  }
};

export const archiveTask = task => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/tasks/${task._id}/archive`, null, {
      headers: { Authorization: getState().auth.token }
    });

    if (response.data.nModified === 1) dispatch({ type: REMOVE_TASK, task });
  } catch (error) {
    console.error({ error });
    dispatch(logout());
  }
};
