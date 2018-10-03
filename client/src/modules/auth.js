const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.auth;

    case LOGOUT:
      return {};

    default:
      return state;
  }
};

export const login = auth => ({ type: LOGIN, auth });
export const logout = () => ({ type: LOGOUT });
