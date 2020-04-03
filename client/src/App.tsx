import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BoardsPage from './pages/BoardsPage';
import ListsPage from './pages/ListsPage';

import { useCurrentUser } from './context/user';

import './styles.scss';

const App = () => {
  const { token }: UserState = useCurrentUser();
  const loggedIn = token !== '';

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/signup">
            <SignupPage />
          </Route>

          <Route path="/lists/:boardId">
            {loggedIn ? <ListsPage /> : <LoginPage />}
          </Route>

          <Route path="/">{loggedIn ? <BoardsPage /> : <LoginPage />}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
