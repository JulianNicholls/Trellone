import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { loadUser, logout } from '../modules/auth';

class Header extends React.Component {
  componentDidMount() {
    const { auth, loadUser } = this.props;

    if (auth.token && !auth.user) loadUser();
  }

  logoutUser = () => {
    const { logout, history } = this.props;

    logout();
    history.replace('/login');
  };

  userOrButtons = () => {
    const { user } = this.props.auth;

    if (!user) {
      return (
        <div className="buttons">
          <Link to="/login" className="button">
            Log in
          </Link>

          <Link to="/signup" className="button">
            Sign up
          </Link>
        </div>
      );
    }

    return (
      <React.Fragment>
        {user.avatarURL && <img src={user.avatarURL} alt="User Avatar" />}
        <div className="navbar-item">{user.displayName}</div>
        <div className="navbar-item">
          <button onClick={this.logoutUser} className="button">
            Log out
          </button>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item is-size-4">
              <strong>Trellone</strong>
            </Link>
          </div>
          {this.userOrButtons()}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default withRouter(
  connect(
    mapStateToProps,
    { loadUser, logout }
  )(Header)
);
