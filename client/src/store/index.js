import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../modules/auth';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer
});

const token = localStorage.auth;

export default () => {
  return createStore(
    reducers,
    { auth: token ? { token } : {} },
    composeEnhacers(applyMiddleware(thunk))
  );
};
