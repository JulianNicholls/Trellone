import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../modules/auth';

const Header = ({ auth, logout }) => {
  const logoutUser = () => logout();

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
          {auth.token ? (
            <React.Fragment>
              <div className="navbar-item">{auth.user.displayName}</div>
              <div className="navbar-item">
                <button onClick={logoutUser} className="button is-link">
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
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logout }
)(Header);
