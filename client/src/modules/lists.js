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
  const response = await fetch(`http://localhost:3100/lists/board/${id}`, {
    headers: {
      Authorization: getState().auth.token
    }
  });

  if (response.status === 401) return dispatch(logout());

  const lists = await response.json();

  console.log({ lists });

  dispatch({ type: LOAD_LISTS, lists });
};

export const createList = list => async (dispatch, getState) => {
  try {
    const response = await fetch('http://localhost:3100/lists/create', {
      headers: {
        'Content-type': 'application/json',
        Authorization: getState().auth.token
      },
      method: 'POST',
      body: JSON.stringify(list)
    });

    if (response.status === 401) return dispatch(logout());

    const newList = await response.json();
    console.log({ newList });

    dispatch({ type: ADD_LIST, list: newList });
  } catch (err) {
    console.error(err);
  }
};
