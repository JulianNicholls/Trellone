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
    const response = await fetch('http://localhost:3100/auth/login', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    });

    const auth = await response.json();

    dispatch({ type: LOGIN, auth });
    localStorage.auth = auth.token;
    callback();
  } catch (_) {
    dispatch({
      type: AUTH_ERROR,
      error: 'The email address or password was not recognised'
    });
  }
};

export const signup = (user, callback) => async dispatch => {
  try {
    const response = await fetch('http://localhost:3100/auth/signup', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    });

    const auth = await response.json();

    if (response.status === 422) {
      dispatch({
        type: AUTH_ERROR,
        error: auth.error
      });

      return;
    }

    dispatch({ type: LOGIN, auth });
    localStorage.auth = auth.token;
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      error: err.error
    });
  }
};

export const logout = () => {
  localStorage.removeItem('auth');

  return { type: LOGOUT };
};

export const loadUser = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3100/users/current', {
    headers: {
      Authorization: getState().auth.token
    }
  });

  const user = await response.json();

  dispatch({ type: SET_USER, user });
};
