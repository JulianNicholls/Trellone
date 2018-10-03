import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import BoardsPage from './pages/Boards';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact component={BoardsPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
