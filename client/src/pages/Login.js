import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1 className="has-text-centered is-size-3">Login</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <form>
              <div className="field">
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="control">
                  <input
                    class="input is-medium"
                    type="email"
                    id="email"
                    autoFocus="true"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="control">
                  <input class="input is-medium" type="password" id="password" />
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

export default LoginPage;
