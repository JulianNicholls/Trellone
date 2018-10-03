import React from 'react';

const Header = () => {
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
          <div className="navbar-item">
            <div className="buttons">
              <a class="button is-info" href="/login">
                Log in
              </a>

              <a class="button is-info" href="/signup">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
