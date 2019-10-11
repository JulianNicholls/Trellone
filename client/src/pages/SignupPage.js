import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import ErrorsPanel from '../components/ErrorsPanel';
import { useCurrentUser } from '../context/user';

const SignupPage = ({ history }) => {
  const { signup } = useCurrentUser();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  const [errors, setErrors] = useState([]);

  const signupUser = async event => {
    event.preventDefault();

    const newErrors = [];

    if (displayName.length < 6)
      newErrors.push('You must enter a display name of at least 6 characters');
    if (email === '') newErrors.push('You must enter a valid email address');
    if (password.length < 6)
      newErrors.push('You must enter a password of at least 6 characters');

    if (newErrors.length === 0) {
      const response = await signup(email, password, displayName, avatarURL);

      if (response.ok) return history.push('/');

      //      console.log('signupUser:', { response });
      newErrors.push(response.data.error);
    }

    setErrors(newErrors);
  };

  return (
    <main>
      <h1 className="centred">Log In</h1>

      <div className="user-panel">
        <form onSubmit={signupUser}>
          <div className="form-field">
            <label htmlFor="displayName">Display name</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={event => setDisplayName(event.target.value)}
              autoFocus={true}
            />
          </div>

          <div className="form-field">
            <label htmlFor="avatarURL">Avatar URL</label>
            <input
              type="url"
              id="avatarURL"
              value={avatarURL}
              onChange={event => setAvatarURL(event.target.value)}
              autoFocus={true}
            />
          </div>

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
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default withRouter(SignupPage);
