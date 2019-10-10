import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useCurrentUser } from '../context/user';

const LoginPage = ({ history }) => {
  const user = useCurrentUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const loginUser = async event => {
    event.preventDefault();

    const newErrors = [];

    console.log({ email, password });

    if (email === '') newErrors.push('You must enter an email address');
    if (password.length < 6) newErrors.push('You must enter a password');

    if (newErrors.length === 0) {
      const response = await user.login(email, password);

      if (response.ok) history.push('/');

      newErrors.push('The email address or password were not recognised');
    }

    setErrors(newErrors);
  };

  const renderErrors = () => {
    if (errors.length === 0) return;

    return (
      <div className="errors">
        {errors.map(e => (
          <div key={e}>{e}</div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <h1 className="centred">Log In</h1>

      <div className="user-panel">
        <form onSubmit={loginUser}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoFocus={true}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          {renderErrors()}

          <div className="button-holder">
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default withRouter(LoginPage);
