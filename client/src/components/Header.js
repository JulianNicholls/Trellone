import React from 'react';
import { connect } from 'react-redux';

import { loadUser, logout } from '../modules/auth';

class Header extends React.Component {
  componentDidMount() {
    if (this.props.auth.token && !this.props.auth.user) {
      this.props.loadUser();
    }
  }

  logoutUser = () => this.props.logout();

  render() {
    const { user } = this.props.auth;

    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            Trellone
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {user ? (
              <React.Fragment>
                {user.avatarURL && (
                  <div className="navbar-item">
                    <img src={user.avatarURL} alt="User Avatar" />
                  </div>
                )}
                <div className="navbar-item">{user.displayName}</div>
                <div className="navbar-item">
                  <button onClick={this.logoutUser} className="button is-link">
                    Log out{' '}
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-link" href="/login">
                    Log in
                  </a>

                  <a className="button is-link" href="/signup">
                    Sign up
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { loadUser, logout }
)(Header);
