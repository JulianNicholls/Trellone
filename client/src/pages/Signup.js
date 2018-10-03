import React, { Component } from 'react';

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

    const response = await fetch('http://localhost:3100/signup', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    console.log(json);
  };

  render() {
    return (
      <div>
        <h1 className="has-text-centered is-size-3">Signup</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter auth-form">
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

export default SignupPage;
