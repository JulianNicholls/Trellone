import React from 'react';
import { useCurrentUser } from '../context/user';

const Header = () => {
  const currentUser = useCurrentUser();

  const userOrButtons = () => {
    const { token, avatarURL, displayName } = currentUser;

    if (token) {
      return (
        <>
          {avatarURL && <img src={avatarURL} alt="User Avatar" />}
          <span>{displayName}</span>
        </>
      );
    }

    // Not logged in, show buttons

    return (
      <>
        <button>Sign up</button>
        <button>Log in</button>
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
