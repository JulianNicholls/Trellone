import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { useCurrentUser } from '../context/user';

const Header = ({ location, history }: RouteComponentProps) => {
  const {
    token,
    user: { avatarURL, displayName },
    logout,
  } = useCurrentUser();

  const userOrButtons = () => {
    if (token) {
      return (
        <>
          {avatarURL && <img src={avatarURL} alt="User Avatar" />}
          <span>{displayName}</span>
          <button
            className="button"
            onClick={() => {
              logout();
              history.push('/login');
            }}
          >
            Log Out
          </button>
        </>
      );
    }

    // Not logged in, show buttons

    return (
      <>
        <Link to="/signup" className="button">
          Sign up
        </Link>
        <Link to="/login" className="button">
          Log in
        </Link>
      </>
    );
  };

  return (
    <header>
      <nav>
        <div className="brand">Trellone</div>
        {userOrButtons()}
      </nav>
    </header>
  );
};

export default withRouter(Header);
