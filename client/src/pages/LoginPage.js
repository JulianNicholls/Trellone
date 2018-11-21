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
        <div className="container">
          <div className="boxed-form auth-form">
            {error && <div className="notification is-danger">{error}</div>}
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
                    required
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
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button-large is-link">Log in</button>
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
