import React from 'react';
import { useCurrentUser } from '../context/user';

const Header = () => {
  const currentUser = useCurrentUser();

  const login = () => {
    currentUser.login('juliannicholls29@gmail.com', 'password');
  };

  const userOrButtons = () => {
    const {
      token,
      user: { avatarURL, displayName },
    } = currentUser;

    if (token) {
      return (
        <>
          {avatarURL && <img src={avatarURL} alt="User Avatar" />}
          <span>{displayName}</span>
          <button onClick={currentUser.logout}>Log Out</button>
        </>
      );
    }

    // Not logged in, show buttons

    return (
      <>
        <button>Sign up</button>
        <button onClick={login}>Log in</button>
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

export default Header;
