import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BoardsPage from './pages/BoardsPage';
import ListsPage from './pages/ListsPage';

import './styles.scss';

const App = () => {
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
            <ListsPage />
          </Route>

          <Route path="/">
            <BoardsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;