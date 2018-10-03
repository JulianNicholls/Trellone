import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../modules/auth';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  updateField = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  loginUser = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3100/login', {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state)
      });

      const auth = await response.json();
      console.log(auth);

      this.props.login(auth);
    } catch (_) {
      this.setState({
        error: 'The email address or password was not recognised'
      });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <h1 className="has-text-centered is-size-3">Login</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter auth-form">
            {error && (
              <h5 className="error has-background-danger has-text-white">
                {error}
              </h5>
            )}
            <form onSubmit={this.loginUser}>
              <div className="field">
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    autoFocus
                    onChange={this.updateField}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.updateField}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link">Log in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(LoginPage);
