import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserContext = createContext();

const EMPTY_USER = {
  displayName: '',
  avatarURL: '',
  email: '',
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(EMPTY_USER);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadUser = async userToken => {
      try {
        const response = await axios.get('/api/users/current', {
          headers: {
            Authorization: userToken,
          },
        });

        setToken(userToken);
        setUser(response.data.user);
      } catch (err) {
        console.log('Token expired');
        localStorage.removeItem('trelloneAuth');
      }
    };

    const lsToken = localStorage.trelloneAuth;

    if (lsToken) loadUser(lsToken);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });

      const { token: userToken, user: loggedinUser } = response.data;
      setToken(userToken);
      localStorage.trelloneAuth = userToken;
      setUser(loggedinUser);

      return { ok: true };
    } catch (error) {
      // console.error(error);
      return { error };
    }
  };

  const signup = async (email, password, displayName, avatarURL) => {
    let response;

    try {
      response = await axios.post('/auth/signup', {
        displayName,
        avatarURL,
        email,
        password,
      });

      const { token: userToken, user: newUser } = response.data;
      setToken(userToken);
      localStorage.trelloneAuth = userToken;
      setUser(newUser);

      return { ok: true };
    } catch (err) {
      // console.warn('uc.signup:', { response: err.response });
      return err.response;
    }
  };

  const logout = () => {
    localStorage.removeItem('trelloneAuth');
    setToken(null);
    setUser(EMPTY_USER);
  };

  const userState = {
    token,
    user,
    login,
    signup,
    logout,
  };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element,
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useCurrentUser must be used within a UserProvider block');

  return context;
};
