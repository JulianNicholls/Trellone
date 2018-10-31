import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from '../modules/auth';

class SignupPage extends Component {
  state = {
    displayName: '',
    avatarURL: '',
    email: '',
    password: '',
    localError: ''
  };

  updateField = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  signup = async e => {
    e.preventDefault();

    const { displayName, email, password } = this.state;

    if (!email || !displayName || displayName.length < 6) {
      return this.setState({
        localError:
          'You must provide an email address, and a display name of at least 6 characters'
      });
    }

    if (!password || password.length < 6) {
      return this.setState({
        localError: 'You must provide a password of at least 6 characters'
      });
    }

    this.setState({ localError: '' });

    this.props.signup(this.state, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { email, password, avatarURL, displayName } = this.state;
    const { error: remoteError } = this.props;
    const { localError } = this.state;
    const error = localError ? localError : remoteError ? remoteError : '';

    return (
      <div>
        <h1 className="has-text-centered is-size-3">Signup</h1>
        <div className="container">
          <div className="boxed-form auth-form">
            {error && <div className="notification is-danger">{error}</div>}
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
                  <button className="button-large">Sign up</button>
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
