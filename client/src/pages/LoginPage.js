import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import ErrorsPanel from '../components/ErrorsPanel';
import { useCurrentUser } from '../context/user';

const LoginPage = ({ history }) => {
  const { login } = useCurrentUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const loginUser = async event => {
    event.preventDefault();

    const newErrors = [];

    if (email === '') newErrors.push('You must enter an email address');
    if (password.length < 6)
      newErrors.push('You must enter a password of at least 6 characters');

    if (newErrors.length === 0) {
      const response = await login(email, password);

      if (response.ok) return history.push('/');

      newErrors.push('The email address or password were not recognised');
    }

    setErrors(newErrors);
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

          <ErrorsPanel errors={errors} />

          <div className="button-holder">
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default withRouter(LoginPage);
