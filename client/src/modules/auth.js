import axios from 'axios';

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const AUTH_ERROR = 'auth/ERROR';
const SET_USER = 'auth/SET_USER';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.auth;

    case LOGOUT:
      return {};

    case AUTH_ERROR:
      return { ...state, error: action.error };

    case SET_USER:
      return { ...state, error: '', user: action.user };

    default:
      return state;
  }
};

export const login = (user, callback) => async dispatch => {
  try {
    const auth = await axios.post('http://localhost:3100/auth/login', user);

    dispatch({ type: LOGIN, auth: auth.data });
    localStorage.auth = auth.data.token;
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      error: 'The email address or password was not recognised'
    });
  }
};

export const signup = (user, callback) => async dispatch => {
  try {
    const auth = await axios.post('http://localhost:3100/auth/signup', user);

    dispatch({ type: LOGIN, auth: auth.data });
    localStorage.auth = auth.data.token;
    callback();
  } catch (error) {
    const message = error.response.data.error || error.message;

    dispatch({
      type: AUTH_ERROR,
      error: message
    });
  }
};

export const logout = () => {
  localStorage.removeItem('auth');

  return { type: LOGOUT };
};

export const loadUser = () => async (dispatch, getState) => {
  try {
    const auth = await axios.get('http://localhost:3100/users/current', {
      headers: {
        Authorization: getState().auth.token
      }
    });

    dispatch({ type: SET_USER, user: auth.data });
  } catch (error) {
    dispatch(logout());
  }
};
