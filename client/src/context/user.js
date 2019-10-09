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
    const loadUser = async token => {
      try {
        const response = await axios.get('/api/users/current', {
          headers: {
            Authorization: token,
          },
        });

        console.log('UPlU:', response);
        setToken(token);
        setUser(response.data.user);
      } catch (err) {
        console.log('Token expired');
      }
    };

    const token = localStorage.trelloneAuth;

    if (token) loadUser(token);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });

      console.log(response);

      const { token, user } = response.data;
      setToken(token);
      localStorage.trelloneAuth = token;
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('/auth/signup', { email, password });

      const { token, user } = response.data;
      setToken(token);
      localStorage.trelloneAuth = token;
      setUser(user);
    } catch (err) {
      console.error(err);
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
