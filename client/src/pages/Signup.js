import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from '../modules/auth';

class SignupPage extends Component {
  state = {
    displayName: '',
    avatarURL: '',
    email: '',
    password: ''
  };

  updateField = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  signup = async e => {
    e.preventDefault();

    this.props.signup(this.state, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { email, password, avatarURL, displayName } = this.state;
    const { error } = this.props;

    return (
      <div>
        <h1 className="has-text-centered is-size-3">Signup</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter auth-form">
            {error && (
              <h5 className="error has-background-danger has-text-white">
                {error}
              </h5>
            )}
            <form onSubmit={this.signup}>
              <div className="field">
                <label className="label" htmlFor="displayName">
                  Display Name
                </label>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    autoFocus
                    onChange={this.updateField}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="avatarURL">
                  Profile Image URL
                </label>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="url"
                    id="avatarURL"
                    name="avatarURL"
                    value={avatarURL}
                    onChange={this.updateField}
                  />
                </div>
              </div>

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
                  <button className="button is-link">Sign up</button>
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
  { signup }
)(SignupPage);
