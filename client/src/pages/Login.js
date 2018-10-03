import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../modules/auth';

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  };

  updateField = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  loginUser = async e => {
    e.preventDefault();

    this.props.login(this.state, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { email, password } = this.state;
    const { error } = this.props;

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

const mapStateToProps = state => ({ error: state.auth.error });

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
